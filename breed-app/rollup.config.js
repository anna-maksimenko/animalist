import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import autoPreprocess from 'svelte-preprocess';
import less from 'svelte-preprocess';
import copy from 'rollup-plugin-copy';
import autoprefixer from 'autoprefixer';

const production = !process.env.ROLLUP_WATCH;

export default {
	input: 'src/main.js',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public/breeds-page.js'
	},
	plugins: [
		svelte({
			dev: !production,
			preprocess: autoPreprocess({
				less: true,
				postcss: {
					plugins: [autoprefixer()]
				}
			}),
			css: css => {
				css.write('public/breeds-page.css');
			}
		}),

		resolve({
			browser: true,
			dedupe: importee => importee === 'svelte' || importee.startsWith('svelte/')
		}),
		commonjs(),
		!production && livereload('public'),
		production && terser(),
		// Part below is needed to copy the bundle files to website project directory
		copy({
			targets: [{
					src: 'public/breeds-page.css',
					dest: '../theme/assets'
				},
				{
					src: 'public/breeds-page.js',
					dest: '../theme/assets'
				}
			],
			hook: 'writeBundle'
		})
	],
	watch: {
		clearScreen: false
	}
};

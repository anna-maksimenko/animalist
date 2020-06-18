import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import autoPreprocess from 'svelte-preprocess';
import less from 'svelte-preprocess';
import copy from 'rollup-plugin-copy';
import autoprefixer from 'autoprefixer';

import babel from 'rollup-plugin-babel';  

const production = !process.env.ROLLUP_WATCH;

export default {
  input: "src/main.js",
  output: {
    sourcemap: true,
    format: "iife",
    name: "app",
    file: "public/poster-app.js"
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
        css.write("public/poster-app.css");
      }
    }),
    babel({
      extensions: [".js", ".mjs", ".html", ".svelte"],
      include: ['src/**', 'node_modules/svelte/**'],
      runtimeHelpers: true
    }),

    resolve({
	  // browser: true,
		  mainFields: ['module','browser'],
      dedupe: importee =>
        importee === "svelte" || importee.startsWith("svelte/")
    }),
    commonjs({
      namedExports: {
        "node_modules/select2/dist/js/select2.full.min.js": ["select2"],
        "node_modules/@welt/sticky-observer/dist/sticky-observer.esm.js": [
          "StickyObserver"
        ]
      }
    }),
    !production && livereload("public"),
    production && terser(),
    // Part below is needed to copy the bundle files to website project directory
    copy({
      targets: [
        {
          src: "public/poster-app.css",
          dest: "../theme/assets"
        },
        {
          src: "public/poster-app.js",
          dest: "../theme/assets"
        }
      ],
      hook: "writeBundle"
    })
  ],
  watch: {
    clearScreen: false
  }
};

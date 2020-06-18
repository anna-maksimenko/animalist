module.exports = function (api) {

    api.cache(true);

    const presets = [
        ["@babel/env", {
            "targets": {
                browsers: [
                    '> 1%',
                    'last 3 versions',
                    'ios >= 6',
                    'not ie < 10'
                ]
            }
        }]
    ];
    const plugins = [
        ["@babel/transform-runtime", { "regenerator": true }]
    ]

    return {
        presets, plugins
    }

}
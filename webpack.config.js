var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        a: [
            'jquery',
            'react'
        ],
        b: [
            './src/default.js'
        ]
    },
    output: {
        filename: "b.js",
        path: './js'
    },
    resolve: {
        root: path.resolve(__dirname) + '/src',
        extensions: ['', '.webpack.js', '.web.js', '.js']
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel', // 'babel-loader' is also a legal name to reference
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['a'],
            filename: "[name].js"
        })
    ]
};

'use strict';

const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const webpackConfig = {
    devtool: 'inline-source-map',
    entry: {
        'shared': './shared.js',
        'app': './app/index.js'
    },
    output: {
        path: path.join(__dirname, './../public/dist'),
        publicPath: '/',
        filename: '[name].bundle.js'
    },
    resolve: {
        extensions: ['.js', '.css'],
        modules: ['node_modules', 'lib']
    },
    resolveLoader: {
        modules: ['node_modules'],
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader',
                    publicPath: '/css'
                })
            },
            {
                test: /\.html$/,
                use: ['raw-loader']
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('[name].bundle.css'),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: cssnano,
            cssProcessorOptions: {discardComments: {removeAll: true}},
            canPrint: true
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'shared',
            filename: 'shared.bundle.js',
            minChunks: Infinity
        })
    ]
};

module.exports = (env) => {
    if (env && env.production){
        webpackConfig.plugins.push(
            new UglifyJSPlugin({
                test: /\.js($|\?)/i,
                uglifyOptions: {
                    mangle: false,
                    keep_classnames: true,
                    keep_fnames: true
                }
            })
        )
    }
    return webpackConfig
};

//===============

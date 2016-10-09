"use strict";

const NODE_ENV = process.env.NODE_ENV || 'development';

const CompressionPlugin = require("compression-webpack-plugin");

const StringReplacePlugin = require("string-replace-webpack-plugin");

const WebpackNotifierPlugin = require('webpack-notifier');

const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const CleanWebpackPlugin = require('clean-webpack-plugin');

const path = require('path');

const webpack = require('webpack');

const fs = require("fs");

const crypto = require('crypto');

const compress = require('compression');

const packagenpm = require('./package.json');

let objBuildList = {};

/**
 * Used files
 */
objBuildList = Object.assign(
    objBuildList,
    {
        "./dist/js/CSTiles": "./src/ts/Modules/CSTiles.ts"
    }
);
/**
 * Plugins list
 */
let arrPlugins = [
    new WebpackNotifierPlugin(),
    new StringReplacePlugin()
];
/**
 * Add BrowserSync for development mode
 */
if (NODE_ENV == "development" || NODE_ENV == "production") {
    arrPlugins.push(
        new BrowserSyncPlugin({
            host: "localhost",
            port: 8080,
            server: {
                baseDir: ['./'],
                middleware: function (req, res, next) {
                    var gzip = compress();
                    gzip(req, res, next);
                }
            }
        })
    );
}
/**
 * Add uglifyer for production mode
 */
if (NODE_ENV == "production" || NODE_ENV == "testing") {
    arrPlugins.push(
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            sourceMap: false,
            output: {
                comments: false
            },
            compressor: {
                warnings: false
            }
        })
    );
    arrPlugins.push(
        new CompressionPlugin({
            asset: "[path].gz[query]",
            algorithm: "gzip",
            test: /dist\/js\/([0-9a-zA-Z-_\/]{1,})\.js$/,
            threshold: 10240,
            minRatio: 0.8
        })
    );
}
/**
 * Add additional plugins
 */
arrPlugins.push(
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify(NODE_ENV)
        }
    })
);

arrPlugins.push(
    new CleanWebpackPlugin([
        "./dist/js"
    ])
);

module.exports = {
    entry: objBuildList,
    output: {
        filename: "[name].js"
    },
    devtool: (NODE_ENV == "development" ? 'inline-source-map' : (NODE_ENV == "testing" ? 'inline-source-map' : '')),
    plugins: arrPlugins,
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },
    resolveLoader: {
        root: path.join(__dirname, 'node_modules')
    },
    module: {
        loaders: [
            {
                test: /\.ts(x?)$/,
                loaders: [
                    StringReplacePlugin.replace({
                        replacements: [
                            {
                                pattern: /#PACKAGE_NAME#/gi,
                                replacement: function (string, pattern1) {
                                    return packagenpm.name;
                                }
                            },
                            {
                                pattern: /#PACKAGE_VERSION#/gi,
                                replacement: function (string, pattern1) {
                                    return packagenpm.version;
                                }
                            }
                        ]
                    }),
                    'babel-loader?presets[]=babel-preset-es2015-loose',
                    'ts-loader'
                ],
                exclude: /node_modules/
            },
            {
                test: /\.png/,
                loader: path.join(__dirname, "./src/loaders/base64-loader.js?type=image/png")
            }
        ]
    }
};

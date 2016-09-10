"use strict";

const NODE_ENV = process.env.NODE_ENV || 'development';

let arrPlugins = [
    new WebpackNotifierPlugin(),
    new StringReplacePlugin()
];
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
if (NODE_ENV == "production") {
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
arrPlugins.push(
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify(NODE_ENV)
        }
    })
);
arrPlugins.push(
    new CleanWebpackPlugin([
        "./dist/js",
        "./src/js"
    ])
);

module.exports = {
    entry: {
        "./dist/js/index": "./src/ts/index.ts"
    },
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
                    "es3ify",
                    StringReplacePlugin.replace({
                        replacements: []
                    }),
                    'babel-loader?presets[]=babel-preset-es2015-loose',
                    'ts-loader'
                ],
                exclude: /node_modules/
            }
        ]
    }
};
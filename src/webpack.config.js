var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');

module.exports = {
    entry: path.resolve(__dirname, './js/app/index.js'),
    output: {
        path: path.resolve(__dirname, '../public'),
        filename: 'js/index.bundle.js',
        publicPath: '/public/'
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({ //把 css 抽离出来生成一个文件
                    fallback: "style-loader",
                    use: ["css-loader", "less-loader", "postcss-loader"],
                    publicPath: '../'
                })
            }, {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: ['url-loader?limit=10000&name=img/[name].[ext]?[hash]', 'img-loader']
            }
        ]
    },
    resolve: {
        alias: {
            jquery: path.resolve(__dirname, './js/lib/jquery-2.0.3.min.js'),
            mod: path.resolve(__dirname, './js/mod'),
            less: path.resolve(__dirname, './less')
        }
    },
    plugins: [
        new webpack.ProvidePlugin({$: 'jquery'}),
        new ExtractTextPlugin("css/index.css"),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [autoprefixer()]
            }
        })
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false,
        //     },
        //     output: {
        //         comments: false,
        //     },
        // }),
    ]
};

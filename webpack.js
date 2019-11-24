/**
 * @file webpack 配置
 * @author mengke01(kekee000@gmail.com)
 */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: './src/main'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'js/[name].js'
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './'
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json']
    },
    externals: {
        jquery: 'window.jQuery',
        $: 'window.jQuery'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'index',
            filename: 'index.html',
            template: path.resolve(__dirname, './index.html')
        })
    ],
    module: {
        rules: [
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1000
                        }
                    }
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|wasm)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1000
                        }
                    }
                ]
            }
        ]
    }
};

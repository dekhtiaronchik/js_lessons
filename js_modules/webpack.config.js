const {
    resolve
} = require('path');
const htmlWebpackPlugin = require("html-webpack-plugin");
const miniCssExtractPlugin = require("mini-css-extract-plugin");
const {
    BundleAnalyzerPlugin
} = require("webpack-bundle-analyzer");

module.exports = {
    entry: resolve(__dirname, 'js', 'main.js'),
    output: {
        path: resolve(__dirname, 'build'),
        filename: 'main.[contenthash].js'
    },
    module: {
        rules: [{
                test: /\.s[ac]ss$/,
                use: [miniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.mp3$/,
                use: ['file-loader']
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: resolve(__dirname, 'index.html'),
        }),
        new miniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        }),
        new BundleAnalyzerPlugin(),
    ],
}
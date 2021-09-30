const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
    mode: 'development',
    entry: {
        index: './src/index.js',
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
    },
    output: {
        clean: true,
        filename: '[name].js',
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                exclude: /style.css$/,
                use: ['style-loader', 'css-loader'],
                generator: {
                    filename: 'styles/[hash][ext][query]',
                }

            },
            {
                test: /style.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],

            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'img/[name]',
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'font/[name][ext][query]',
                }

            },
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'Calculator',
            template: './src/index.html',
        }),
        new MiniCssExtractPlugin(
            {
                filename: "./css/style.[hash].css",
                chunkFilename: "[id].css",
                ignoreOrder: false

            },
        ),
    ],

};
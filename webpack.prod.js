const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");




module.exports = {
    mode: 'production',
    entry: {
        index: './src/index.js',
    },

    output: {
        clean: true,
        filename: './components/[name].[contenthash].js',
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                exclude: /style.css$/,
                use: ['style-loader', 'css-loader'],

            },

            {
                test: /style.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],

            },

            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'img/[hash][ext][query]',
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'font/[hash][ext][query]',
                }

            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-transform-runtime']
                    }
                }
            }
        ]
    },

    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin()
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'Prod',
            template: './src/index.html',
            filename: 'main.[hash].html'
        }),
        new MiniCssExtractPlugin(
            {
                filename: "./style/main.[hash].css",
                chunkFilename: "[id].css",
                ignoreOrder: false

            },
        ),

    ],


};
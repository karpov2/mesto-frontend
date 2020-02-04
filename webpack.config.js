const path = require('path'); 
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // Подключили к проекту плагин
const HtmlWebpackPlugin = require('html-webpack-plugin'); // научился работать с HTML
const WebpackMd5Hash = require('webpack-md5-hash'); // Отслеживает хеши и обновляет их
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpack = require('webpack');

// создаем переменную для development-сборки
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
    // Точка входа (откуда брать файл)
    entry: { main: './src/app/index.js' },
    // Точка выхода (куда будут записываться фалы)
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash].js'
    },
    
    // Правила обработки файлов при сборке
    module: {
        rules: [ // тут описываются правила
            {
                test: /\.js$/, // регулярное выражение, которое ищет все js файлы
                use: { loader: 'babel-loader' }, // весь JS обрабатывается пакетом babel-loader
                exclude: /node_modules/ // исключает папку node_modules
            },
            {
                test: /\.css$/i, // применять это правило только к CSS-файлам
                use: [(isDev ? 'style-loader' : MiniCssExtractPlugin.loader), // в правилах укажите, что если вы собираете в режиме dev, то плагин MiniCssExtractPlugin загружать не нужно.
                    'css-loader', 
                    'postcss-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif|ico|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: './images/[name].[ext]', // указали папку, куда складывать изображения
                            esModule: false
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {}
                    },
                ]
            },
            
            // Настройка для подгрузки шрифтов
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                loader: 'file-loader',
                options: {
                    name: './vendor/[name].[ext]', // указали папку, куда складывать шрифты
                }
            }
        ]
    },

    plugins: [ 
        new MiniCssExtractPlugin({filename: 'style.[contenthash].css'}),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                    preset: ['default'],
            },
            canPrint: true
        }), // подключите плагин после MiniCssExtractPlugin
        new HtmlWebpackPlugin({
            // Означает, что:
            inject: false, // стили НЕ нужно прописывать внутри тегов
            template: './src/index.html', // откуда брать образец для сравнения с текущим видом проекта
            filename: 'index.html' // имя выходного файла, то есть того, что окажется в папке dist после сборки
        }),
        new WebpackMd5Hash(),
        new webpack.DefinePlugin({
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        })
    ]
};
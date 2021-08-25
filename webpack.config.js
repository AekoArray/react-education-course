const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV;
const IS_DEV = NODE_ENV === 'development';
const IS_PROD = NODE_ENV === 'production';

function setupDevtool() {
    if (IS_DEV) return 'eval';
    if (IS_PROD) return false;
}

module.exports = {
    resolve: {
        extensions: ['.js', '.jsx', '.ts', 'tsx', '.json']
    },
    mode: NODE_ENV ? NODE_ENV : 'development',
    //откуда начинать
    entry: path.resolve(__dirname, 'src/index.jsx'),
    //куда помещать транспилируемый код
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js'
    },
    //настройка зависимостей(loaders)
    module: {
        rules: [{
            //файлы с этим окончанием будут обрабатываться с помощью
            //этого лоадера
            test: /\.[tj]sx?$/,
            use: ['ts-loader']
        }]
    },
    plugins: [
        new HTMLWebpackPlugin({ template: path.resolve(__dirname, 'index.html') })
    ],
    devServer: {
       port: 3000,
       open: true,
       hot: IS_DEV
    },
    devtool: setupDevtool()
};
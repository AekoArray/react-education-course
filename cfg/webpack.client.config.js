const path = require('path');

const NODE_ENV = process.env.NODE_ENV;
const IS_DEV = NODE_ENV === 'development';
const IS_PROD = NODE_ENV === 'production';

//генерирует настройку для devtool в зависимости от NODE_ENV
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
    entry: path.resolve(__dirname, '../src/client/index.jsx'),
    //куда помещать транспилируемый код
    output: {
        path: path.resolve(__dirname, '../dist/client'),
        filename: 'client.js'
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
    devtool: setupDevtool()
};
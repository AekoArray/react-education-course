const path = require('path');
const { HotModuleReplacementPlugin} = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

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
        extensions: ['.js', '.jsx', '.ts', 'tsx', '.json'],
        //вместо реакт дом, мы отдаем другие зависимости
        alias: {
            'react-dom': IS_DEV ? '@hot-loader/react-dom' : 'react-dom',
        }
    },
    mode: NODE_ENV ? NODE_ENV : 'development',
    //откуда начинать
    entry: [
        path.resolve(__dirname, '../src/client/index.jsx'),
        'webpack-hot-middleware/client?path=http://localhost:3001/static/__webpack_hmr',
    ],
    //куда помещать транспилируемый код
    output: {
        path: path.resolve(__dirname, '../dist/client'),
        filename: 'client.js',
        publicPath: "/static/",
    },
    //настройка зависимостей(loaders)
    module: {
        rules: [
            {
                //файлы с этим окончанием будут обрабатываться с помощью
                //этого лоадера
                test: /\.[tj]sx?$/,
                use: ['ts-loader']
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader', 
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                mode: 'local',
                                localIdentName: '[name]__[local]--[hash:base64:5]',
                            },
                        }
                    }
                ]
            }
        ]
    },
    devtool: setupDevtool(),
    plugins: IS_DEV
    ? [
        new CleanWebpackPlugin(),
        new HotModuleReplacementPlugin(),
    ]
    : [],
};
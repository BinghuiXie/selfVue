const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/main.js',
    devtool: 'cheap-module-eval-source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: './dist'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/, // 如果 js 文件在 node_modules 里面就不使用 babel-loader，因为 node_modules 里面的代码是第三方代码，没必要进行转义，因为已经转好了，所以只有文件不在 node_modules里面 babel-loader 才生效
                loader: "babel-loader",
                options: {
                    "presets": ["@babel/preset-env"]
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        })
    ]
}
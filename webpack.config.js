/*
 * @Description: 
 * @Author: wangyang
 * @Date: 2022-03-19 15:14:41
 * @LastEditors: wangyang
 * @LastEditTime: 2022-03-19 16:00:54
 */
const path = require('path')
module.exports = {
    //入口
    entry: './src/index.js',
    output: {
        publicPath: 'xuni',
        filename: 'bundle.js'
    },
    devServer: {
        port: '8080',
        contentBase: 'www'
    }
}
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const dev = require('./webpack.dev.config');

module.exports = merge(dev, {
  // 可以合并一些配置
  // output: {
  //   path: path.resolve(__dirname, '../dist'),
  //   filename: 'js/app.js',
  //   publicPath: 'dist/',
  // },
  // 可以在这里配置对应的输出CDN路径如 http://localhost:8080/
});

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = false;
  module.exports.plugins = [
    //提取公用模块打包成一个新文件
	  new webpack.optimize.CommonsChunkPlugin({name: "vendor",filename: 'vendor.build.js'}),
	  //将样式统一发布到common.css中
	  new ExtractTextPlugin({filename:"common.css",allChunks: true}),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    //构建前先清空，防止出现垃圾文件
    new CleanWebpackPlugin(['./public/build/'], {
      root: process.cwd(),
      exclude: []
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      },
      sourceMap: false
    })
  ];
}
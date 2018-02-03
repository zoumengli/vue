var path = require('path');
var webpack = require('webpack');
//定义了一些文件夹的路径
var ROOT_PATH = path.resolve(__dirname);
var BUILD_PATH = path.resolve(__dirname, './public/build');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: {
		admin_index: path.resolve(__dirname, './src/modules/mobile/main.js'),
		vendor: ["vue","vue-resource","vue-router"]//设置哪些第三方库分开打包
	},
	//输出的文件名 合并以后的js会命名为xxx.build.js
	output: {
		path: BUILD_PATH,
		filename: '[name].build.js',
		// 非主文件的命名规则
		chunkFilename: '[id].build.js?[chunkhash]',
		// 指向异步加载的路径
		publicPath :  "/public/build/"
	},

	resolve: {
		//约定省略后缀
		extensions: ['*', '.js', '.vue', '.json', '.sass', '.css', '.less'],
		//缩小文件搜索范围
		modules: [path.resolve(__dirname, 'node_modules')]
		// alias: {
        //     vue: path.join(__dirname,'/node_modules/vue/dist/vue')
        // }
	},
	module: {
		noParse: /es6-promise\.js$/, // avoid webpack shimming process
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					loaders: {
						css: ExtractTextPlugin.extract({
							use: [
								{
									loader: 'css-loader',
									options: { minimize: true, sourceMap: false }
								}
							],
							fallback: 'vue-style-loader' // <- this is a dep of vue-loader, so no need to explicitly install if using npm3
						}),
						postcss: ExtractTextPlugin.extract({
							use: [
								{
									loader: 'css-loader',
									options: { minimize: true, sourceMap: false }
								}
							],
							fallback: 'style-loader' // <- this is a dep of vue-loader, so no need to explicitly install if using npm3
						}),
						stylus: ExtractTextPlugin.extract({
							use: [
								{
									loader: 'css-loader',
									options: { minimize: true, sourceMap: false }
								},
								{ 
									loader: 'stylus-loader', options: { sourceMap: false } 
								} 
							],
							fallback: 'vue-style-loader' // <- this is a dep of vue-loader, so no need to explicitly install if using npm3
						})						
					},
					postcss: [require('postcss-cssnext')()]
				}
			},
			{
				test: /\.js$/,
				use: ['babel-loader'],
      			exclude: /node_modules/
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader',
							options: {
								minimize: true
							}
						}
					]
				})
			},
			{
				test: /\.(sass|scss)$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader',
							options: {
								minimize: true
							}
						},
						'sass-loader'
					]
				})
			},
			{
				test: /\.less$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader',
							options: {
								minimize: true
							}
						},
						'less-loader'
					]
				})
			},
			{
				test: /\.(png|jpg|gif)$/,
				use: [{
					loader: 'url-loader',
					options:{
						limit: 25000
					}
				}]
			},
			{
				test:  /\.(woff|ttf|svg|eot)\??.*$/,
				use: [{
					loader: 'url-loader',
					options:{
						limit: 100000
					}
				}]
			}
		]
	}
};

// 开发环境
if (process.env.NODE_ENV !== 'production') {
	// 配置开发服务器
	module.exports.devServer = {
		contentBase: path.resolve(__dirname, './'),  // 定义页面文件的位置
		historyApiFallback: true,
		hot: true,
		inline:true,
		port:8086 //端口你可以自定义
  };
  //module.exports.devtool = '#cheap-module-eval-source-map';
  module.exports.plugins = [
	  //提取公用模块打包成一个新文件
	  new webpack.optimize.CommonsChunkPlugin({name: "vendor",filename: 'vendor.build.js'}),
	  //将样式统一发布到common.css中
	  new ExtractTextPlugin({filename:"common.css",allChunks: true}),
	  new webpack.NoEmitOnErrorsPlugin()
	];
}
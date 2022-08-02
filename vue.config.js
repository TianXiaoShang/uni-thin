const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin') //最新版本copy-webpack-plugin插件暂不兼容，推荐v5.0.0
const WindiCSSWebpackPlugin = require('windicss-webpack-plugin')
const MiniProgramTailwindWebpackPlugin = require("@dcasia/mini-program-tailwind-webpack-plugin")

module.exports = {
	configureWebpack: {
		plugins: [
			new CopyWebpackPlugin([
				{
					from: path.join(__dirname, 'src/image'),
					to: path.join(__dirname, 'dist', process.env.NODE_ENV === 'production' ? 'build' : 'dev', process.env.UNI_PLATFORM, 'image')
				}
			]),
			new WindiCSSWebpackPlugin(),
			new MiniProgramTailwindWebpackPlugin({enableRpx: false}),
		]
	}
}
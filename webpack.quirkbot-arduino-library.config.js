const path = require('path')

module.exports = {
	entry : [
		'babel-polyfill',
		'./src/simulator/quirkbotArduinoLibrary/Quirkbot.js'
	],
	output : {
		path          : path.resolve(__dirname, 'static/lib/quirkbot-arduino-library'),
		library       : 'quirkbot-arduino-library',
		libraryTarget : 'umd',
		filename      : 'quirkbot-arduino-library.js',
	},
	module : {
		rules : [
			{
				use : {
					loader  : 'babel-loader',
					options : {
						presets : ['@babel/preset-env'],
						plugins : ['@babel/plugin-proposal-class-properties']
					}
				}
			}
		]
	}
}

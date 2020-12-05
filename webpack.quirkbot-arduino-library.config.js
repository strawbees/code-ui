const path = require('path')

module.exports = {
	resolveLoader : {
		modules : [path.resolve(__dirname, 'node_modules')],
	},
	resolve : {
		modules : [path.resolve(__dirname, 'node_modules')],
	},
	entry : [
		'babel-polyfill',
		path.resolve(__dirname, path.join('src', 'simulator', 'quirkbotArduinoLibrary', 'Quirkbot.js')),
	],
	output : {
		path          : path.resolve(__dirname, path.join('static', 'lib', 'quirkbot-arduino-library')),
		library       : 'QuirkbotArduinoLibrary',
		libraryTarget : 'var',
		filename      : 'quirkbot-arduino-library.js',
	},
	optimization : {
		minimize : true
	},
	module : {
		rules : [
			{
				use : {
					loader  : 'babel-loader',
					options : {
						presets : ['@babel/preset-env'],
						plugins : ['@babel/plugin-proposal-class-properties'],
					}
				}
			}
		]
	}
}

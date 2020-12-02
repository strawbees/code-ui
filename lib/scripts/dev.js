#!/usr/bin/env node
const path = require('path')
const clean = require('./clean')
const copyResources = require('./copyResources')
const generateStaticData = require('./generateStaticData')
const execute = require('../utils/execute')

execute(async ({ fork, exec }) => {
	try {
		// clean
		await clean()
		// copy static resources
		await copyResources()
		// Build QuirkbotArduinoLibrary
		await exec(`webpack -c ${path.resolve(__dirname, '..', '..', 'webpack.quirkbot-arduino-library.config.js')}`)
		// generate static data
		await generateStaticData()
		// start next
		await fork(path.resolve(__dirname, '..', '..', 'server.js'))
	} catch (error) {
		// eslint-disable-next-line no-console
		console.log('Error during dev', error)
		// exit the process with an error
		process.exit(error)
	}
})

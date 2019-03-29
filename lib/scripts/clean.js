#!/usr/bin/env node
const path = require('path')
const rimraf = require('../utils/rimraf')
const nextConfig = require('../../next.config.js')

const {
	NEXT_EXPORT_PATH,
} = nextConfig.publicRuntimeConfig

module.exports = async () => {
	await rimraf(NEXT_EXPORT_PATH)
	await rimraf(path.resolve(__dirname, '..', '..', '.prebuild-cache'))
	await rimraf(path.resolve(__dirname, '..', '..', '.next'))
	await rimraf(path.resolve(__dirname, '..', '..', 'node_modules', '.cache', 'babel-loader'))
}

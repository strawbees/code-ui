const { fork } = require('child_process')

module.exports.main = async () => {
	// Start the compiler
	process.env.COMPILER_BUILD_ROOT = window.nw.App.dataPath
	process.env.COMPILER_PORT = 9511
	const compilerProcess = fork(
		require.resolve('strawbees-code-compiler-service', 'app.js'),
		{ stdio : 'pipe' }
	)
	process.on('exit', () => compilerProcess.kill())
}

module.exports.inject_js_start = async () => {
	const manifest = require('quirkbot-chrome-app/manifest.json')
	const loadScriptToDom = async (src) => new Promise((resolve, reject) => {
		const script = document.createElement('script')
		let loaded
		script.setAttribute('src', src)
		const timeout = window.setTimeout(reject, 10000)
		const onload = () => {
			if (!loaded) {
				window.clearTimeout(timeout)
				resolve()
			}
			loaded = true
		}
		script.onreadystatechange = onload
		script.onload = onload
		document.getElementsByTagName('head')[0].appendChild(script)
	})

	// Load the extension
	for (let i = 0; i < manifest.app.background.scripts.length; i++) {
		const src = manifest.app.background.scripts[i]
		await loadScriptToDom(`/node_modules/quirkbot-chrome-app/${src}`)
	}
}

const path = require('path')
const { exec, fork } = require('child_process')

const platformPathSep = /^win/.test(process.platform) ? ';' : ':'
const localBinPath = `${path.resolve(__dirname, '..', '..', 'node_modules', '.bin')}`

const getDefaultOptions = () => ({
	cwd    : process.cwd(),
	silent : true,
	env    : Object.assign(
		{},
		process.env,
		{
			PATH : `${localBinPath}${platformPathSep}${process.env.PATH}`,
			Path : `${localBinPath}${platformPathSep}${process.env.Path}`
		}
	)
})
const run = (script, cmd, opt = {}, promise) => {
	const fn = (cb) => {
		// eslint-disable-next-line no-console
		console.log(`-> ${cmd}`)
		const child = script(cmd, Object.assign({}, opt, getDefaultOptions()))
		child.stdout.on('data', data =>
			process.stdout.write(`${data}`)
		)
		child.stderr.on('data', data =>
			process.stdout.write(`stderr: ${data}`)
		)
		child.on('close', code => {
			// eslint-disable-next-line no-console
			console.log(`child process exited with code ${code}`)
			cb(code)
		})
	}
	if (!promise) {
		return fn((code) => {
			if (code) {
				throw new Error(`Exited with error code ${code}`)
			}
		})
	}
	return new Promise((resolve, reject) => fn((code) => {
		if (code) {
			reject(code)
			return
		}
		resolve()
	}))
}
module.exports = async fn => fn({
	exec      : (cmd, opt) => run(exec, cmd, opt, true),
	execAsync : (cmd, opt) => run(exec, cmd, opt),
	fork      : (cmd, opt) => run(fork, cmd, opt, true),
	forkAsync : (cmd, opt) => run(fork, cmd, opt)
})

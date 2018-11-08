const { fork } = require('child_process')

// Start the compiler
process.env.COMPILER_BUILD_ROOT = nw.App.dataPath
process.env.COMPILER_PORT = 9511
const compilerProcess = fork(
	require.resolve('strawbees-code-compiler-service/app.js'),
	{ stdio : 'pipe' }
)
process.on('exit', () => compilerProcess.kill())

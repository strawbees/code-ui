const compilerBootloaderUpdaterRetrivalErrorSelector = () => (state) =>
	(
		state &&
		state.compiler &&
		state.compiler.bootloaderUpdaterRetrivalError
	) || null

export default compilerBootloaderUpdaterRetrivalErrorSelector

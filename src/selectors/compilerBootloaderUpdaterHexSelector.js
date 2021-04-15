const compilerBootloaderUpdaterHexSelector = () => (state) =>
	(
		state &&
		state.compiler &&
		state.compiler.bootloaderUpdaterHex
	) || null

export default compilerBootloaderUpdaterHexSelector

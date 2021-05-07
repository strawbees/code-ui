const MEMORY = {}
let TreeSitter
const loadCppParser = async (rootPath = '') => {
	if (!TreeSitter) {
		// Set the correct path for loding the wasm module
		window.Module = {
			locateFile : (s) => `${rootPath}/static/lib/tree-sitter/${s}`,
		}
		TreeSitter = (await import('static/lib/tree-sitter/tree-sitter')).default
	}
	if (!MEMORY.inited) {
		await TreeSitter.init()
		MEMORY.inited = true
	}
	if (MEMORY[rootPath]) {
		return MEMORY[rootPath]
	}
	const parser = new TreeSitter()
	const Lang = await TreeSitter.Language.load(`${rootPath}/static/lib/tree-sitter/tree-sitter-cpp.wasm`)
	parser.setLanguage(Lang)
	MEMORY[rootPath] = parser
	return MEMORY[rootPath]
}

export default loadCppParser

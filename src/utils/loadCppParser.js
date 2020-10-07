const MEMORY = {}
const loadCppParser = async (rootPath = '') => {
	if (typeof window === 'undefined' || typeof window.TreeSitter === 'undefined') {
		throw new Error('tree-sitter is not loaded, cannot load cpp parser')
	}
	if (MEMORY[rootPath]) {
		return MEMORY[rootPath]
	}
	await window.TreeSitter.init()
	const parser = new window.TreeSitter()
	const Lang = await window.TreeSitter.Language.load(`${rootPath}/static/lib/tree-sitter/tree-sitter-cpp.wasm`)
	parser.setLanguage(Lang)
	MEMORY[rootPath] = parser
	return MEMORY[rootPath]
}

export default loadCppParser

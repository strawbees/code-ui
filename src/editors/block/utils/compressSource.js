const compressSource = async (source) => {
	const parser = new DOMParser()
	const serializer = new XMLSerializer()
	const sourceDoc = parser.parseFromString(source, 'text/xml')
	const idHash = {}
	Array.from(sourceDoc.querySelectorAll('[id]')).forEach(el =>
		idHash[el.id] = (idHash[el.id] || 0) + 1
	)

	Object.keys(idHash).filter(id => idHash[id] === 1).forEach(id => {
		const el = sourceDoc.getElementById(id)
		if (el.nodeName === 'variable') {
			return
		}
		el.removeAttribute('id')
	})

	const compressedSource = serializer.serializeToString(sourceDoc)

	return compressedSource
}

export default compressSource

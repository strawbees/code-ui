const sortDomNode = (node) => {
	if (!node || !node.children || !node.children.length) {
		return
	}
	const items = []
	for (let i = 0; i < node.children.length; ++i) {
		const child = node.children[i]
		if (child.nodeType === 1) {
			sortDomNode(child)
			items.push(child)
		}
	}
	items.sort((a, b) => {
		if (a.tagName.toLowerCase() === 'variables' && b.tagName.toLowerCase() !== 'variables') {
			return -1
		}
		if (b.tagName.toLowerCase() === 'variables' && a.tagName.toLowerCase() !== 'variables') {
			return 1
		}
		if (a.tagName.toLowerCase() === 'statement' && b.tagName.toLowerCase() === 'statement'
			&& a.attributes && a.attributes[0] && a.attributes[0].nodeValue
			&& b.attributes && b.attributes[0] && b.attributes[0].nodeValue) {
			if (a.attributes[0].nodeValue === b.attributes[0].nodeValue) {
				return 0
			}
			if (a.attributes[0].nodeValue > b.attributes[0].nodeValue) {
				return 1
			}
			return -1
		}
		if (a.innerHTML === b.innerHTML) {
			return 0
		}
		if (a.innerHTML > b.innerHTML) {
			return 1
		}
		return -1
	})

	for (let i = 0; i < items.length; ++i) {
		node.appendChild(items[i])
	}
}

export default sortDomNode

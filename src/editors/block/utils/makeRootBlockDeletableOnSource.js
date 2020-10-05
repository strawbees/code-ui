const makeRootBlockDeletableOnSource = (xml) => {
	if (!xml || !xml.children || !xml.children.length) {
		return
	}
	for (let i = 0; i < xml.children.length; ++i) {
		const child = xml.children[i]
		let isRoot
		let notDeletable
		for (let j = 0; j < child.attributes.length; ++j) {
			const { nodeName, nodeValue } = child.attributes[j]
			if (nodeName === 'id' && nodeValue === 'rootblock') {
				isRoot = true
			}
			if (nodeName === 'deletable' && nodeValue === 'false') {
				notDeletable = true
			}
		}
		if (isRoot && notDeletable) {
			child.removeAttribute('deletable')
		}
	}
}

export default makeRootBlockDeletableOnSource

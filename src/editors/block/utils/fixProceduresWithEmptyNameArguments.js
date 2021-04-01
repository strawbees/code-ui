const fixProceduresWithEmptyNameArguments = (xml) => {
	if (!xml || !xml.children || !xml.children.length) {
		return
	}
	for (let i = 0; i < xml.children.length; ++i) {
		const child = xml.children[i]
		if (child.getAttribute('type') !== 'procedures_definition') {
			continue
		}
		const shaddow = child.children?.[0]?.children?.[0]
		const mutation = shaddow?.children?.[0]
		if (!mutation) {
			continue
		}
		let argumentnames = []
		try {
			argumentnames = JSON.parse(mutation.getAttribute('argumentnames')) || []
		} catch (e) {
			continue
		}
		let emptyCount = 0
		argumentnames = argumentnames.map(name => {
			if (name) {
				return name
			}
			emptyCount++
			return `arg${emptyCount > 1 ? emptyCount : ''}`
		})
		mutation.setAttribute('argumentnames', JSON.stringify(argumentnames))

		emptyCount = 0
		for (let j = 1; j < shaddow.children.length; ++j) {
			const value = shaddow.children[j]
			const node = value.children?.[0]?.children?.[0]
			if (!node) {
				continue
			}
			if (typeof node.childNodes?.[0]?.nodeValue !== 'undefined') {
				continue
			}
			emptyCount++
			node.appendChild(document.createTextNode(`arg${emptyCount > 1 ? emptyCount : ''}`))
		}
	}
}

export default fixProceduresWithEmptyNameArguments

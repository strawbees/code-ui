const generateNewProgramSource = (type) => {
	switch (type) {
		case 'flow':
			return []
		case 'block':
			return '<xml xmlns="http://www.w3.org/1999/xhtml"><variables></variables></xml>'
		case 'text':
			return '#include "Quirkbot.h"\n\nvoid setup(){\n\t\n}\n\nvoid loop(){\n\t\n}'
		default:
			return null
	}
}

export default generateNewProgramSource

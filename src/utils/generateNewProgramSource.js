export default (type) => {
	switch (type) {
		case 'flow':
			return {}
		case 'scratch':
			return '<xml><block type="event_power_on" id="rootblock" deletable="false" x="50" y="50"></xml>'
		case 'text':
			return '#include "Quirkbot.h"\nvoid setup(){\n}\nvoid loop(){\n}'
		default:
			return null
	}
}

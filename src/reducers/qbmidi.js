import { QBMIDI_SET_LINKS } from 'src/constants/actionTypes'

const qbmidiLinks = (state = {}, { type, payload }) => {
	switch (type) {
		case QBMIDI_SET_LINKS:
			return {
				...payload
			}
		default:
			return state
	}
}

export default {
	qbmidiLinks
}

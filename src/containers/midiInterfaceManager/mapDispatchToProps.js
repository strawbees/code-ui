import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import {
	setQbmidiLinks,
	setQbmidiAvailable,
	setQbmidiReady,
} from 'src/actions/qbmidi'

export default autobindDispatchToActionCreators({
	setQbmidiLinks,
	setQbmidiAvailable,
	setQbmidiReady,
})

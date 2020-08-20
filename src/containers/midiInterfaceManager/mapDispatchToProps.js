import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import {
	setQbmidiLinks,
	setQbmidiAvailable,
	setQbmidiReady,
} from 'src/actions/qbmidi'

const mapDispatchToProps = autobindDispatchToActionCreators({
	setQbmidiLinks,
	setQbmidiAvailable,
	setQbmidiReady,
})

export default mapDispatchToProps

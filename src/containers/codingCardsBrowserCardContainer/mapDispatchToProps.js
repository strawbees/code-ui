import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import {
	closeModal,
} from 'src/actions/modal'
import {
	setCodingCardsFlowCurrentCardId,
	setCodingCardsBlockCurrentCardId,
} from 'src/actions/ui'

const mapDispatchToProps = autobindDispatchToActionCreators({
	closeModal,
	setCodingCardsFlowCurrentCardId,
	setCodingCardsBlockCurrentCardId,
})

export default mapDispatchToProps

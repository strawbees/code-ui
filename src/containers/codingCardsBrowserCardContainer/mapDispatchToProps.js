import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import {
	closeModal,
} from 'src/actions/modal'
import {
	setCodingCardsFlowCurrentCardId,
	setCodingCardsBlockCurrentCardId,
} from 'src/actions/ui'

export default autobindDispatchToActionCreators({
	closeModal,
	setCodingCardsFlowCurrentCardId,
	setCodingCardsBlockCurrentCardId,
})

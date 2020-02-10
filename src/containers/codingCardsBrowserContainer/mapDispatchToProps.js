import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import {
	setCodingCardsFlowCurrentCardId,
	setCodingCardsBlockCurrentCardId,
} from 'src/actions/ui'

export default autobindDispatchToActionCreators({
	setCodingCardsFlowCurrentCardId,
	setCodingCardsBlockCurrentCardId,
})

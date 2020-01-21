import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import {
	setCodingCardsFlowFilterIds,
	setCodingCardsBlockFilterIds,
} from 'src/actions/ui'

export default autobindDispatchToActionCreators({
	setCodingCardsFlowFilterIds,
	setCodingCardsBlockFilterIds,
})

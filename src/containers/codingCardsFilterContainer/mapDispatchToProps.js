import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import {
	setCodingCardsFlowFilterIds,
	setCodingCardsBlockFilterIds,
} from 'src/actions/ui'

const mapDispatchToProps = autobindDispatchToActionCreators({
	setCodingCardsFlowFilterIds,
	setCodingCardsBlockFilterIds,
})

export default mapDispatchToProps

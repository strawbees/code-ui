import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import {
	setCodingCardsFlowCurrentCardId,
	setCodingCardsBlockCurrentCardId,
} from 'src/actions/ui'

const mapDispatchToProps = autobindDispatchToActionCreators({
	setCodingCardsFlowCurrentCardId,
	setCodingCardsBlockCurrentCardId,
})

export default mapDispatchToProps

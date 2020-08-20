import autobindDispatchToActionCreators from 'src/utils/autobindDispatchToActionCreators'
import {
	modalViewCodingCards,
} from 'src/actions/codingCards'

const mapDispatchToProps = autobindDispatchToActionCreators({
	modalViewCodingCards,
})

export default mapDispatchToProps

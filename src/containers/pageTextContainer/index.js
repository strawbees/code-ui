import { connect } from 'react-redux'
import TextEditor from 'src/editors/text'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const PageTextContainer = (props) =>
	<TextEditor {...props}/>

export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(PageTextContainer)

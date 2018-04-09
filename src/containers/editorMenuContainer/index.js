import { connect } from 'react-redux'
import EditorMenu from 'src/components/editorMenu'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(EditorMenu)

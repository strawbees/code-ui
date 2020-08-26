import { connect } from 'react-redux'
import AceEditor from 'src/components/aceEditor'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const mirrorEditorContainerConnected = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(AceEditor)

export default mirrorEditorContainerConnected

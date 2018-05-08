import { connect } from 'react-redux'
import VisualToTextEditor from 'src/components/visualToTextEditor'
import FlowEditor from 'src/editors/flow'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const PageFlowContainer = (props) =>
	<VisualToTextEditor
		VisualEditor={FlowEditor}
		{...props}
	/>


export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(PageFlowContainer)

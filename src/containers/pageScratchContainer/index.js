import { connect } from 'react-redux'
import VisualToTextEditor from 'src/components/editors/visualToText'
import ScratchEditor from 'src/components/editors/scratch'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const PageHomeContainer = (props) =>
	<VisualToTextEditor
		VisualEditor={ScratchEditor}
		{...props}
	/>


export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(PageHomeContainer)

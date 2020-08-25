import { createStructuredSelector } from 'reselect'
import sourceSelector from 'src/editors/flow/selectors/sourceSelector'
import refEditorSourceSelector from 'src/selectors/refEditorSourceSelector'

const mapStateToProps = () => createStructuredSelector({
	source          : sourceSelector(),
	refEditorSource : refEditorSourceSelector(),
})

export default mapStateToProps

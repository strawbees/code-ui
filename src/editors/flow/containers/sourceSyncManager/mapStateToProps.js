import { createStructuredSelector } from 'reselect'
import sourceSelector from 'src/editors/flow/selectors/sourceSelector'
import refEditorSourceSelector from 'src/selectors/refEditorSourceSelector'

export default () => createStructuredSelector({
	source          : sourceSelector(),
	refEditorSource : refEditorSourceSelector(),
})

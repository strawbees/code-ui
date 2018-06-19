import { createStructuredSelector } from 'reselect'
import refEditorSourceSelector from 'src/selectors/refEditorSourceSelector'

export default () => createStructuredSelector({
	source : refEditorSourceSelector()
})

import { createStructuredSelector } from 'reselect'
import refEditorGeneratedCodeSelector from 'src/selectors/refEditorGeneratedCodeSelector'

export default () => createStructuredSelector({
	value : refEditorGeneratedCodeSelector(),
})

import { createSelector } from 'reselect'
import refEditorSourceSelector from 'src/selectors/refEditorSourceSelector'
import refEditorGeneratedCodeSelector from 'src/selectors/refEditorGeneratedCodeSelector'

export default createSelector(
	[
		refEditorSourceSelector,
		refEditorGeneratedCodeSelector
	],
	(
		source,
		generatedCode
	) => ({
		source,
		generatedCode
	})
)

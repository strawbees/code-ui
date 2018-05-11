import { createSelector } from 'reselect'
import refEditorGeneratedCodeSelector from 'src/selectors/refEditorGeneratedCodeSelector'

export default createSelector(
	[
		refEditorGeneratedCodeSelector
	],
	(
		value
	) => ({
		value
	})
)

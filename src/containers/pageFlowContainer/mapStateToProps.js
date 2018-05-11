import { createSelector } from 'reselect'
import refEditorSourceSelector from 'src/selectors/refEditorSourceSelector'

export default createSelector(
	[
		refEditorSourceSelector
	],
	(
		refEditorSource,
	) => ({
		refEditorSource,
	})
)

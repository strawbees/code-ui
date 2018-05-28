import { createSelector } from 'reselect'
import sourceSelector from 'src/editors/flow/selectors/sourceSelector'
import refEditorSourceSelector from 'src/selectors/refEditorSourceSelector'

export default createSelector(
	[
		sourceSelector,
		refEditorSourceSelector,
	],
	(
		source,
		refEditorSource,
	) => ({
		source,
		refEditorSource,
	})
)

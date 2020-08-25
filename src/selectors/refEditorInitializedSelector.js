import { createSelector } from 'reselect'
import refEditorSourceSelector from 'src/selectors/refEditorSourceSelector'

const refEditorInitializedSelector = () => createSelector(
	[
		refEditorSourceSelector(),
	],
	(
		refEditorSource,
	) => refEditorSource !== null
)

export default refEditorInitializedSelector

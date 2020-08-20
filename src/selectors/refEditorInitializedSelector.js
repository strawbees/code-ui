import { createSelector } from 'reselect'
import refEditorSourceSelector from 'src/selectors/refEditorSourceSelector'

const selector = () => createSelector(
	[
		refEditorSourceSelector(),
	],
	(
		refEditorSource,
	) => refEditorSource !== null
)

export default selector

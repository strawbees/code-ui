import { createSelector } from 'reselect'
import refEditorDataSelector from 'src/selectors/refEditorDataSelector'

const refEditorSourceSelector = () => createSelector(
	[
		refEditorDataSelector(),
	],
	(
		data,
	) => data && data.source
)

export default refEditorSourceSelector

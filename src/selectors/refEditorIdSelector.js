import { createSelector } from 'reselect'
import refEditorDataSelector from 'src/selectors/refEditorDataSelector'

export default () => createSelector(
	[
		refEditorDataSelector(),
	],
	(
		refEditorData,
	) => refEditorData.id
)

import { createSelector } from 'reselect'
import refEditorDataSelector from 'src/selectors/refEditorDataSelector'

export default () => createSelector(
	[
		refEditorDataSelector(),
	],
	(
		data,
	) => data && data.source
)

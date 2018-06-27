import { createSelector } from 'reselect'
import refEditorDataSelector from 'src/selectors/refEditorDataSelector'

export default () => createSelector(
	[
		refEditorDataSelector(),
	],
	(
		{ source },
	) => source
)

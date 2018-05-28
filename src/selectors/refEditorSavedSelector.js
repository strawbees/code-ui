import { createSelector } from 'reselect'
import refEditorIdSelector from 'src/selectors/refEditorIdSelector'

export default () => createSelector(
	[
		refEditorIdSelector(),
	],
	(
		refEditorId,
	) => refEditorId !== null
)

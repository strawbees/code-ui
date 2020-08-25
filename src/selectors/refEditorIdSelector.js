import { createSelector } from 'reselect'
import refEditorDataSelector from 'src/selectors/refEditorDataSelector'

const refEditorIdSelector = () => createSelector(
	[
		refEditorDataSelector(),
	],
	(
		refEditorData,
	) => refEditorData && refEditorData.id
)

export default refEditorIdSelector

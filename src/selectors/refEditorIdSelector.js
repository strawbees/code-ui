import { createSelector } from 'reselect'
import refEditorDataSelector from 'src/selectors/refEditorDataSelector'

const selector = () => createSelector(
	[
		refEditorDataSelector(),
	],
	(
		refEditorData,
	) => refEditorData && refEditorData.id
)

export default selector

import { createSelector } from 'reselect'
import refEditorDataSelector from 'src/selectors/refEditorDataSelector'

const selector = () => createSelector(
	[
		refEditorDataSelector(),
	],
	(
		data,
	) => data && data.source
)

export default selector

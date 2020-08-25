import { createSelector } from 'reselect'
import qbmidiLinksSelector from 'src/selectors/qbmidiLinksSelector'

const qbmidiRuntimeIdListSelector = () => createSelector(
	[
		qbmidiLinksSelector(),
	],
	(
		qbmidiLinks,
	) => Object.keys(qbmidiLinks)
)

export default qbmidiRuntimeIdListSelector

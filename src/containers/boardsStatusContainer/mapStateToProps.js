import { createSelector } from 'reselect'
import qbmidiLinksSelector from 'src/selectors/qbmidiLinksSelector'

export default createSelector(
	[
		qbmidiLinksSelector
	],
	(
		qbmidiLinks
	) => ({
		boards : Object.keys(qbmidiLinks)
	})
)

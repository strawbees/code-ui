import { createSelector } from 'reselect'
import qbmidiLinksSelector from 'src/selectors/qbmidiLinksSelector'

export default createSelector(
	[
		(_, { id }) => id,
		qbmidiLinksSelector
	],
	(
		id,
		qbmidiLinks
	) => qbmidiLinks[id]
)

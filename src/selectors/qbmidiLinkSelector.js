import { createSelector } from 'reselect'
import qbmidiLinksSelector from 'src/selectors/qbmidiLinksSelector'

const qbmidiLinkSelector = () => createSelector(
	[
		(_, { runtimeId }) => runtimeId,
		qbmidiLinksSelector(),
	],
	(
		runtimeId,
		qbmidiLinks,
	) => qbmidiLinks[runtimeId]
)

export default qbmidiLinkSelector

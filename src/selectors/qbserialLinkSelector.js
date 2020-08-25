import { createSelector } from 'reselect'
import qbserialLinksSelector from 'src/selectors/qbserialLinksSelector'

const qbserialLinkSelector = () => createSelector(
	[
		(_, { runtimeId }) => runtimeId,
		qbserialLinksSelector(),
	],
	(
		runtimeId,
		qbserialLinks,
	) => qbserialLinks[runtimeId]
)

export default qbserialLinkSelector

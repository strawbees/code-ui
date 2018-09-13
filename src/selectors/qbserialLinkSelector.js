import { createSelector } from 'reselect'
import qbserialLinksSelector from 'src/selectors/qbserialLinksSelector'

export default () => createSelector(
	[
		(_, { runtimeId }) => runtimeId,
		qbserialLinksSelector(),
	],
	(
		runtimeId,
		qbserialLinks,
	) => qbserialLinks[runtimeId]
)

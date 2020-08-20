import { createSelector } from 'reselect'
import qbserialLinksSelector from 'src/selectors/qbserialLinksSelector'

const selector = () => createSelector(
	[
		(_, { runtimeId }) => runtimeId,
		qbserialLinksSelector(),
	],
	(
		runtimeId,
		qbserialLinks,
	) => qbserialLinks[runtimeId]
)

export default selector

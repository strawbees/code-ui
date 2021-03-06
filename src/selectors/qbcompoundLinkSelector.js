import { createSelector } from 'reselect'
import qbcompoundLinksSelector from 'src/selectors/qbcompoundLinksSelector'

const qbcompoundLinkSelector = () => createSelector(
	[
		(_, { runtimeId }) => runtimeId,
		qbcompoundLinksSelector(),
	],
	(
		runtimeId,
		qbcompoundLinks,
	) => qbcompoundLinks[runtimeId]
)

export default qbcompoundLinkSelector

import { createSelector } from 'reselect'
import qbcompoundLinksSelector from 'src/selectors/qbcompoundLinksSelector'

export default () => createSelector(
	[
		(_, { runtimeId }) => runtimeId,
		qbcompoundLinksSelector(),
	],
	(
		runtimeId,
		qbcompoundLinks,
	) => qbcompoundLinks[runtimeId]
)

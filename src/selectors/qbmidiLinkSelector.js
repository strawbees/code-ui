import { createSelector } from 'reselect'
import qbmidiLinksSelector from 'src/selectors/qbmidiLinksSelector'

export default () => createSelector(
	[
		(_, { runtimeId }) => runtimeId,
		qbmidiLinksSelector(),
	],
	(
		runtimeId,
		qbmidiLinks,
	) => qbmidiLinks[runtimeId]
)

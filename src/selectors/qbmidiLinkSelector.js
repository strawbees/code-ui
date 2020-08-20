import { createSelector } from 'reselect'
import qbmidiLinksSelector from 'src/selectors/qbmidiLinksSelector'

const selector = () => createSelector(
	[
		(_, { runtimeId }) => runtimeId,
		qbmidiLinksSelector(),
	],
	(
		runtimeId,
		qbmidiLinks,
	) => qbmidiLinks[runtimeId]
)

export default selector

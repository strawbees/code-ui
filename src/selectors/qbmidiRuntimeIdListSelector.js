import { createSelector } from 'reselect'
import qbmidiLinksSelector from 'src/selectors/qbmidiLinksSelector'

const selector = () => createSelector(
	[
		qbmidiLinksSelector(),
	],
	(
		qbmidiLinks,
	) => Object.keys(qbmidiLinks)
)

export default selector

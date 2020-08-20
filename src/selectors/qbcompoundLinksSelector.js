import { createSelector } from 'reselect'
import qbserialLinksSelector from 'src/selectors/qbserialLinksSelector'
import qbmidiLinksSelector from 'src/selectors/qbmidiLinksSelector'

const selector = () => createSelector(
	[
		qbserialLinksSelector(),
		qbmidiLinksSelector(),
	],
	(
		qbserialLinks,
		qbmidiLinks,
	) => ({
		...qbmidiLinks,
		...qbserialLinks,
	})
)

export default selector

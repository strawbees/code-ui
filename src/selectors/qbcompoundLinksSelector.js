import { createSelector } from 'reselect'
import qbserialLinksSelector from 'src/selectors/qbserialLinksSelector'
import qbmidiLinksSelector from 'src/selectors/qbmidiLinksSelector'

const qbcompoundLinksSelector = () => createSelector(
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

export default qbcompoundLinksSelector

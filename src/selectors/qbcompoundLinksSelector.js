import { createSelector } from 'reselect'
import qbserialLinksSelector from 'src/selectors/qbserialLinksSelector'
import qbmidiLinksSelector from 'src/selectors/qbmidiLinksSelector'

export default () => createSelector(
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

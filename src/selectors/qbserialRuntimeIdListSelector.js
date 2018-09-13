import { createSelector } from 'reselect'
import qbserialLinksSelector from 'src/selectors/qbserialLinksSelector'

export default () => createSelector(
	[
		qbserialLinksSelector(),
	],
	(
		qbserialLinks,
	) => Object.keys(qbserialLinks)
)

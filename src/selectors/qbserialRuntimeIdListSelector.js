import { createSelector } from 'reselect'
import qbserialLinksSelector from 'src/selectors/qbserialLinksSelector'

const selector = () => createSelector(
	[
		qbserialLinksSelector(),
	],
	(
		qbserialLinks,
	) => Object.keys(qbserialLinks)
)

export default selector

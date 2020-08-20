import { createSelector } from 'reselect'
import qbserialLinksSelector from 'src/selectors/qbserialLinksSelector'

const qbserialRuntimeIdListSelector = () => createSelector(
	[
		qbserialLinksSelector(),
	],
	(
		qbserialLinks,
	) => Object.keys(qbserialLinks)
)

export default qbserialRuntimeIdListSelector

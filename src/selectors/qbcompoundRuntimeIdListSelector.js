import { createSelector } from 'reselect'
import qbcompoundLinksSelector from 'src/selectors/qbcompoundLinksSelector'

const selector = () => createSelector(
	[
		qbcompoundLinksSelector(),
	],
	(
		qbcompoundLinks,
	) => Object.keys(qbcompoundLinks)
)

export default selector

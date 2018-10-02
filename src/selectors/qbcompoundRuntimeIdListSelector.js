import { createSelector } from 'reselect'
import qbcompoundLinksSelector from 'src/selectors/qbcompoundLinksSelector'

export default () => createSelector(
	[
		qbcompoundLinksSelector(),
	],
	(
		qbcompoundLinks,
	) => Object.keys(qbcompoundLinks)
)

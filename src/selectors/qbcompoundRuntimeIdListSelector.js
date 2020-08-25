import { createSelector } from 'reselect'
import qbcompoundLinksSelector from 'src/selectors/qbcompoundLinksSelector'

const qbcompoundRuntimeIdListSelector = () => createSelector(
	[
		qbcompoundLinksSelector(),
	],
	(
		qbcompoundLinks,
	) => Object.keys(qbcompoundLinks)
)

export default qbcompoundRuntimeIdListSelector

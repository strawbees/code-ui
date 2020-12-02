import { createSelector } from 'reselect'
import internalDataNodeIdsSelector from './internalDataNodeIdsSelector'

const internalDataNodeIdsStringSelector = () => createSelector(
	[
		internalDataNodeIdsSelector(),
	],
	(
		ids,
	) => JSON.stringify(ids)
)

export default internalDataNodeIdsStringSelector

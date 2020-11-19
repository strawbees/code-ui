import { createSelector } from 'reselect'
import internalDataNodeTypesSelector from './internalDataNodeTypesSelector'

const internalDataNodeTypesStringSelector = () => createSelector(
	[
		internalDataNodeTypesSelector(),
	],
	(
		nodeTypes,
	) => JSON.stringify(nodeTypes)
)

export default internalDataNodeTypesStringSelector

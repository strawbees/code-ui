import { createSelector } from 'reselect'
import reportEntitiesSelector from './reportEntitiesSelector'

const reportNodeSelector = (fnId) => createSelector(
	[
		(_, { id }) => id,
		reportEntitiesSelector(),
	],
	(
		id,
		entities
	) => entities[fnId || id]
)

export default reportNodeSelector

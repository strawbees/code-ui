import { createSelector } from 'reselect'
import uploaderEntitiesSelector from 'src/selectors/uploaderEntitiesSelector'

export default createSelector(
	[
		uploaderEntitiesSelector,
		(state, { hex, runtimeId }) => `${hex}${runtimeId}`
	],
	(
		compilerEntities,
		id
	) => compilerEntities[id]
)

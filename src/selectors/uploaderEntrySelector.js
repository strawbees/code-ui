import { createSelector } from 'reselect'
import uploaderEntitiesSelector from 'src/selectors/uploaderEntitiesSelector'
import hashCode from 'src/utils/hashCode'

export default () => createSelector(
	[
		uploaderEntitiesSelector(),
		(state, { hex, runtimeId }) => hashCode(`${hex}${runtimeId}`),
	],
	(
		compilerEntities,
		id,
	) => compilerEntities[id]
)

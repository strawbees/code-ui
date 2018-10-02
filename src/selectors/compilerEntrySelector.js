import { createSelector } from 'reselect'
import compilerEntitiesSelector from 'src/selectors/compilerEntitiesSelector'
import hashCode from 'src/utils/hashCode'

export default () => createSelector(
	[
		compilerEntitiesSelector(),
		(state, { code }) => hashCode(code),
	],
	(
		compilerEntities,
		id,
	) => compilerEntities[id] || {}
)

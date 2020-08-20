import { createSelector } from 'reselect'
import compilerEntitiesSelector from 'src/selectors/compilerEntitiesSelector'
import hashCode from 'src/utils/hashCode'

const selector = () => createSelector(
	[
		compilerEntitiesSelector(),
		(state, { code }) => hashCode(code),
	],
	(
		compilerEntities,
		id,
	) => compilerEntities[id] || {}
)

export default selector

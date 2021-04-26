import { createSelector } from 'reselect'
import uploaderEntitiesSelector from 'src/selectors/uploaderEntitiesSelector'
import hashCode from 'src/utils/hashCode'

const uploaderEntrySelector = () => createSelector(
	[
		uploaderEntitiesSelector(),
		(state, { hex, runtimeId }) => hashCode(`${hex}${runtimeId}`),
	],
	(
		uploaderEntities,
		id,
	) => uploaderEntities[id]
)

export default uploaderEntrySelector

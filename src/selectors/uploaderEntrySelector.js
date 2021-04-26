import { createSelector } from 'reselect'
import uploaderEntitiesSelector from 'src/selectors/uploaderEntitiesSelector'
import hashCode from 'src/utils/hashCode'

const uploaderEntrySelector = () => createSelector(
	[
		uploaderEntitiesSelector(),
		(state, { hex, hexes, runtimeId }) => {
			let currentHex = hex
			if (hexes && hexes.length) {
				currentHex = hexes[hexes.length - 1]
			}
			return hashCode(`${currentHex}${runtimeId}`)
		},
	],
	(
		uploaderEntities,
		id,
	) => uploaderEntities[id]
)

export default uploaderEntrySelector

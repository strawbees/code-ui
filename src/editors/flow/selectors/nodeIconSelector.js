import { createSelector } from 'reselect'
import icons from 'src/editors/flow/assets/icons'

export default createSelector(
	[
		(state, { id }) => id
	],
	(
		id
	) => icons.nodes[id]
)

import { createSelector } from 'reselect'
import makeStringSelector from 'src/selectors/makeStringSelector'

const nodeNameSelector = () => createSelector(
	[
		(state, { id }) => makeStringSelector(`flow.node.${id}`)(state),
	],
	(
		name
	) => name
)

export default nodeNameSelector

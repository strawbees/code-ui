import { createSelector } from 'reselect'
import makeStringSelector from 'src/selectors/makeStringSelector'

export default () => createSelector(
	[
		(state, { id }) => makeStringSelector(`flow.outlet.${id}`)(state)
	],
	(
		name,
	) => name
)

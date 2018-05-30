import { createSelector } from 'reselect'
import makeStringSelector from 'src/selectors/makeStringSelector'

export default () => createSelector(
	[
		(state, { id }) => makeStringSelector(`flow.connection.${id}`)(state)
	],
	(
		name,
	) => name
)

import { createSelector } from 'reselect'
import makeStringSelector from 'src/selectors/makeStringSelector'

const outletNameSelector = () => createSelector(
	[
		(state, { id }) => makeStringSelector(`flow.outlet.${id}`)(state),
	],
	(
		name,
	) => name
)

export default outletNameSelector

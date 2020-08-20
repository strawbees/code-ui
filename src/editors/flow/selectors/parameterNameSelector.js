import { createSelector } from 'reselect'
import makeStringSelector from 'src/selectors/makeStringSelector'

const selector = () => createSelector(
	[
		(state, { id }) => makeStringSelector(`flow.parameter.${id}`)(state)
	],
	(
		name,
	) => name
)

export default selector

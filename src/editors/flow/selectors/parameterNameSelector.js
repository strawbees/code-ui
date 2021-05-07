import { createSelector } from 'reselect'
import makeStringSelector from 'src/selectors/makeStringSelector'

const parameterNameSelector = () => createSelector(
	[
		(state, { id }) => makeStringSelector(`flow.parameter.${id}`)(state),
	],
	(
		name,
	) => name
)

export default parameterNameSelector

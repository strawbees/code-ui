import { createSelector } from 'reselect'
import makeStringSelector from 'src/selectors/makeStringSelector'

export default createSelector(
	[
		(state, { value }) => makeStringSelector(value)(state)
	],
	(
		string,
	) => ({
		string
	})
)

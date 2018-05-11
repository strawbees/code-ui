import { createSelector } from 'reselect'
import baseSourceSelector from 'src/editors/flow/selectors/baseSourceSelector'

export default createSelector(
	[
		baseSourceSelector,
		(state, { id }) => id
	],
	(
		source,
		id
	) => source
		.slice(0)
		.filter(instance => instance.id === id)
		.pop()
)

import { createSelector } from 'reselect'
import makeStringSelector from 'src/selectors/makeStringSelector'

const categoryNameSelector = () => createSelector(
	[
		(state, { id }) => makeStringSelector(`flow.category.${id}`)(state),
	],
	(
		name
	) => name
)

export default categoryNameSelector

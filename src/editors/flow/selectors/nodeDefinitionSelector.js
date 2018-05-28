import { createSelector } from 'reselect'
import propsIdSelector from 'src/editors/flow/selectors/propsIdSelector'
import baseNodeDefinitionsSelector from 'src/editors/flow/selectors/baseNodeDefinitionsSelector'

export default createSelector(
	[
		baseNodeDefinitionsSelector,
		propsIdSelector,
	],
	(
		nodeDefinitions,
		id,
	) => nodeDefinitions[id]
)

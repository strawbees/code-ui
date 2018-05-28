import { createSelector } from 'reselect'
import propsIdSelector from 'src/editors/flow/selectors/propsIdSelector'
import icons from 'src/editors/flow/assets/icons'

export default createSelector(
	[
		propsIdSelector,
	],
	(
		id,
	) => icons.nodes[id]
)

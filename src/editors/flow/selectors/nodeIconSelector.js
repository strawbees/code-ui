import { createSelector } from 'reselect'
import propsIdSelector from 'src/editors/flow/selectors/propsIdSelector'
import icons from 'src/editors/flow/assets/icons'

const selector = () => createSelector(
	[
		propsIdSelector(),
	],
	(
		id,
	) => icons.nodes[id]
)

export default selector

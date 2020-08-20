import { createSelector } from 'reselect'
import propsIdSelector from 'src/editors/flow/selectors/propsIdSelector'
import sourceSelector from 'src/editors/flow/selectors/sourceSelector'

const selector = () => createSelector(
	[
		sourceSelector(),
		propsIdSelector(),
	],
	(
		source,
		id,
	) => source
		.slice(0)
		.filter(instance => instance.id === id)
		.pop()
)

export default selector

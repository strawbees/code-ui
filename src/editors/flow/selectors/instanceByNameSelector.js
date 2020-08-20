import { createSelector } from 'reselect'
import propsNameSelector from 'src/editors/flow/selectors/propsNameSelector'
import sourceSelector from 'src/editors/flow/selectors/sourceSelector'

const selector = () => createSelector(
	[
		sourceSelector(),
		propsNameSelector(),
	],
	(
		source,
		name,
	) => source
		.slice(0)
		.filter(instance => instance.name === name)
		.pop()
)

export default selector

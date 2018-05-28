import { createSelector } from 'reselect'
import propsIdSelector from 'src/editors/flow/selectors/propsIdSelector'
import sourceSelector from 'src/editors/flow/selectors/sourceSelector'

export default () => createSelector(
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

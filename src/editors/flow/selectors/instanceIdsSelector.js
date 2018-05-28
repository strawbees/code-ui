import { createSelector } from 'reselect'
import sourceSelector from 'src/editors/flow/selectors/sourceSelector'

export default () => createSelector(
	[
		sourceSelector(),
	],
	(
		source
	) => source.map(({ id }) => id)
)

import { createSelector } from 'reselect'
import rawSourceSelector from 'src/editors/flow/selectors/rawSourceSelector'
import propsSourceSelector from 'src/editors/flow/selectors/propsSourceSelector'

export default () => createSelector(
	[
		rawSourceSelector(),
		propsSourceSelector(),
	],
	(
		rawSource,
		propsSource
	) => {
		if (propsSource) {
			return propsSource
		}
		return rawSource
	}
)

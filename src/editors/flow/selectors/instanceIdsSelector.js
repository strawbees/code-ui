import { createSelector } from 'reselect'
import baseSourceSelector from 'src/editors/flow/selectors/baseSourceSelector'

export default createSelector(
	[
		baseSourceSelector
	],
	(
		baseSource
	) => baseSource.map(({ id }) => id)
)

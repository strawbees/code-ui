import { createSelector } from 'reselect'
import ogSelector from 'src/selectors/ogSelector'

export default createSelector(
	[
		ogSelector
	],
	(
		og
	) => ({
		og
	})
)

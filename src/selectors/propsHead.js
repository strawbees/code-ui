import { createSelector } from 'reselect'
import ogSelector from 'src/selectors/og'

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

import { createSelector } from 'reselect'
import queryRefSelector from 'src/selectors/queryRefSelector'

export default createSelector(
	[
		queryRefSelector,
	],
	(
		queryRef
	) => ({
		queryRef
	})
)

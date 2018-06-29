import { createSelector } from 'reselect'
import queryRefSelector from 'src/selectors/queryRefSelector'

export default () => createSelector(
	[
		queryRefSelector(),
	],
	(
		queryRef,
	) => {
		switch (queryRef) {
			case 'flow':
			case 'block':
			case 'text':
				return queryRef
			default:
				return null
		}
	}
)

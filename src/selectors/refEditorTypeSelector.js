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
				return 'flow'
			case 'scratch':
				return 'scratch'
			case 'text':
				return 'text'
			default:
				return null
		}
	}
)

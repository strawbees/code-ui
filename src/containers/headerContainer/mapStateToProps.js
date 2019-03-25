import { createSelector } from 'reselect'
import queryRefSelector from 'src/selectors/queryRefSelector'
import makeStringSelector from 'src/selectors/makeStringSelector'

export default () => createSelector(
	[
		queryRefSelector(),
		makeStringSelector('routes.home'),
	],
	(
		queryRef,
		homeUrl,
	) => ({
		editorMenu : queryRef === 'flow' || queryRef === 'block' || queryRef === 'text',
		homeUrl
	})
)

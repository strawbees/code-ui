import { createSelector } from 'reselect'
import queryRefSelector from 'src/selectors/queryRefSelector'
import makeInternalUrlStringSelector from 'src/selectors/makeInternalUrlStringSelector'

export default () => createSelector(
	[
		queryRefSelector(),
		makeInternalUrlStringSelector('home.url'),
	],
	(
		queryRef,
		homeUrl,
	) => ({
		editorMenu : queryRef === 'flow' || queryRef === 'block' || queryRef === 'text',
		homeUrl
	})
)

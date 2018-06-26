import { createSelector } from 'reselect'
import queryRefSelector from 'src/selectors/queryRefSelector'
import makeStringSelector from 'src/selectors/makeStringSelector'

export default () => createSelector(
	[
		queryRefSelector(),
		makeStringSelector('home.url'),
		makeStringSelector('flow.url'),
		makeStringSelector('block.url'),
		makeStringSelector('text.url')
	],
	(
		queryRef,
		homeUrl,
		flowUrl,
		blockUrl,
		textUrl
	) => ({
		editorMenu : queryRef === 'flow' || queryRef === 'block' || queryRef === 'text',
		homeUrl,
		flowUrl,
		blockUrl,
		textUrl
	})
)

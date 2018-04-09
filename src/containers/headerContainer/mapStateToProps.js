import { createSelector } from 'reselect'
import queryRefSelector from 'src/selectors/queryRefSelector'
import makeStringSelector from 'src/selectors/makeStringSelector'

export default createSelector(
	[
		queryRefSelector,
		makeStringSelector('home.url'),
		makeStringSelector('flow.url'),
		makeStringSelector('scratch.url'),
		makeStringSelector('text.url')
	],
	(
		queryRef,
		homeUrl,
		flowUrl,
		scratchUrl,
		textUrl
	) => ({
		editorMenu : queryRef === 'flow' || queryRef === 'scratch' || queryRef === 'text',
		homeUrl,
		flowUrl,
		scratchUrl,
		textUrl
	})
)

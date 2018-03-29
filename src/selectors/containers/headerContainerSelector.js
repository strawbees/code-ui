import { createSelector } from 'reselect'
import makeStringSelector from 'src/selectors/makeStringSelector'

export default createSelector(
	[
		makeStringSelector('home.url'),
		makeStringSelector('flow.url'),
		makeStringSelector('scratch.url'),
		makeStringSelector('text.url')
	],
	(
		homeUrl,
		flowUrl,
		scratchUrl,
		textUrl
	) => ({
		homeUrl,
		flowUrl,
		scratchUrl,
		textUrl
	})
)

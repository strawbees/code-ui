import { createSelector } from 'reselect'
import propsLocalesMenuSelector from 'src/selectors/propsLocalesMenu'
import makeStringSelector from 'src/selectors/makeStringSelector'

export default createSelector(
	[
		makeStringSelector('home.url'),
		makeStringSelector('flow.url'),
		makeStringSelector('scratch.url'),
		makeStringSelector('text.url'),
		propsLocalesMenuSelector
	],
	(
		homeUrl,
		flowUrl,
		scratchUrl,
		textUrl,
		propsLocalesMenu
	) => ({
		homeUrl,
		flowUrl,
		scratchUrl,
		textUrl,
		propsLocalesMenu
	})
)

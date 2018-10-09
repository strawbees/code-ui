import { createSelector } from 'reselect'
import urlVarsSelector from 'src/selectors/urlVarsSelector'

export default () => createSelector(
	[
		urlVarsSelector()
	],
	(
		urlVars
	) => ({
		token : urlVars.t
	})
)

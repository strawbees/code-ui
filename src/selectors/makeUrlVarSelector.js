import { createSelector } from 'reselect'
import urlVarsSelector from 'src/selectors/urlVars'

export default (key) => createSelector(
	[
		urlVarsSelector
	],
	(
		urlVars
	) => urlVars[key] || ''
)

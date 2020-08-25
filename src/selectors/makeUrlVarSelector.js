import { createSelector } from 'reselect'
import urlVarsSelector from 'src/selectors/urlVarsSelector'

const makeUrlVarSelector = (key) => createSelector(
	[
		urlVarsSelector(),
	],
	(
		urlVars
	) => urlVars[key] || ''
)

export default makeUrlVarSelector

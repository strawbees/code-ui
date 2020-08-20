import { createSelector } from 'reselect'
import urlVarsSelector from 'src/selectors/urlVarsSelector'

const selector = (key) => createSelector(
	[
		urlVarsSelector(),
	],
	(
		urlVars
	) => urlVars[key] || ''
)

export default selector

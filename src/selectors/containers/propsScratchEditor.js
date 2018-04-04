import { createSelector } from 'reselect'
import queryLocaleSelector from 'src/selectors/queryLocaleSelector'
import makeUrlVarSelector from 'src/selectors/makeUrlVarSelector'
import stringsSelector from 'src/selectors/stringsSelector'

export default createSelector(
	[
		queryLocaleSelector,
		makeUrlVarSelector('p'),
		stringsSelector
	],
	(
		queryLocale,
		p,
		strings
	) => ({
		state : { strings },
		key   : `${queryLocale}_${p}`
	})
)

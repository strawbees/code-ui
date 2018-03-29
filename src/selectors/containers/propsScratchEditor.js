import { createSelector } from 'reselect'
import queryLocaleSelector from 'src/selectors/queryLocale'
import makeUrlVarSelector from 'src/selectors/makeUrlVarSelector'

export default createSelector(
	[
		queryLocaleSelector,
		makeUrlVarSelector('p'),
		state => state
	],
	(
		queryLocale,
		p,
		state
	) => ({
		state,
		key : `${queryLocale}_${p}`
	})
)

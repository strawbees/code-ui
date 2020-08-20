import { createSelector } from 'reselect'
import stringsSelector from 'src/selectors/stringsSelector'
import queryLocaleSelector from 'src/selectors/queryLocaleSelector'

const selector = () => createSelector(
	[
		stringsSelector(),
		queryLocaleSelector(),
	],
	(
		strings,
		queryLocale,
	) => strings[queryLocale]
)

export default selector

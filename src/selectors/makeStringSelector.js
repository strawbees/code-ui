import { createSelector } from 'reselect'
import localeStringsSelector from 'src/selectors/localeStringsSelector'
import s from 'src/utils/s'

const makeStringSelector = (key, showKeyIfMissing) => createSelector(
	[
		localeStringsSelector(),
	],
	(
		localeStrings
	) => s(localeStrings, key, showKeyIfMissing)
)

export default makeStringSelector

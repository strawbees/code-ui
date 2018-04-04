import { createSelector } from 'reselect'
import localStorageSelector from 'src/selectors/localStorageSelector'

export default createSelector(
	[
		localStorageSelector
	],
	(
		localStorage
	) => ({
		localStorage
	})
)

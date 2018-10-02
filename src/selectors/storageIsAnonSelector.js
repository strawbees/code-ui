import { createSelector } from 'reselect'
import storageCredentialsSelector from 'src/selectors/storageCredentialsSelector'

export default () => createSelector(
	[
		storageCredentialsSelector(),
	],
	(
		credentials,
	) => {
		if (credentials) {
			return false
		}
		return true
	}
)

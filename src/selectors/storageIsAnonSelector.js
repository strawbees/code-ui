import { createSelector } from 'reselect'
import storageCredentialsSelector from 'src/selectors/storageCredentialsSelector'

const storageIsAnonSelector = () => createSelector(
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

export default storageIsAnonSelector

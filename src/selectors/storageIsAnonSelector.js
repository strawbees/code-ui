import { createSelector } from 'reselect'
import storageCredentialsSelector from 'src/selectors/storageCredentialsSelector'

const selector = () => createSelector(
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

export default selector

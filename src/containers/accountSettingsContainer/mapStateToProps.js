import { createSelector } from 'reselect'
import storageCredentialsSelector from 'src/selectors/storageCredentialsSelector'

export default () => createSelector(
	[
		storageCredentialsSelector(),
	],
	(
		storageCredentials,
	) => ({
		// eslint-disable-next-line no-unneeded-ternary
		isAnon : storageCredentials ? false : true,
	})
)

import { createSelector } from 'reselect'
import storageCredentialsSelector from 'src/selectors/storageCredentialsSelector'
import makeStringSelector from 'src/selectors/makeStringSelector'

export default () => createSelector(
	[
		makeStringSelector('ui.user.anon_username'),
		storageCredentialsSelector(),
	],
	(
		anonUsername,
		storageCredentials,
	) => ({
		// eslint-disable-next-line no-unneeded-ternary
		isAnon   : storageCredentials ? false : true,
		username : (storageCredentials && storageCredentials.displayName) || anonUsername
	})
)

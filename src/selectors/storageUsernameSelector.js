import { createSelector } from 'reselect'
import { resolveBackend } from 'src/storage'
import makeStringSelector from 'src/selectors/makeStringSelector'
import storageCredentialsSelector from 'src/selectors/storageCredentialsSelector'

export default () => createSelector(
	[
		makeStringSelector('ui.user.anon_username'),
		storageCredentialsSelector(),
	],
	(
		anonUsername,
		credentials,
	) => resolveBackend(credentials).resolveUsername(credentials) || anonUsername
)

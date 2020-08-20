import { createSelector } from 'reselect'
import makeStringSelector from 'src/selectors/makeStringSelector'
import storageUserSelector from 'src/selectors/storageUserSelector'

const storageUsernameSelector = () => createSelector(
	[
		makeStringSelector('ui.user.anon_username'),
		storageUserSelector(),
	],
	(
		anonUsername,
		user,
	) => (user && user.username) || anonUsername
)

export default storageUsernameSelector

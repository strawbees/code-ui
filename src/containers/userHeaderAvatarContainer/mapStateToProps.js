import { createSelector } from 'reselect'
import storageCredentialsSelector from 'src/selectors/storageCredentialsSelector'
import makeStringSelector from 'src/selectors/makeStringSelector'

export default () => createSelector(
	[
		makeStringSelector('home.url'),
		storageCredentialsSelector(),
	],
	(
		homeUrl,
		storageCredentials,
	) => ({
		profileUrl : homeUrl,
		// eslint-disable-next-line no-unneeded-ternary
		isAnon     : storageCredentials ? false : true
	})
)

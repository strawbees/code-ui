import { createSelector } from 'reselect'
import makeStringSelector from 'src/selectors/makeStringSelector'
import storageUserSelector from 'src/selectors/storageUserSelector'
import storageCredentialsSelector from 'src/selectors/storageCredentialsSelector'
import { resolveBackendFromCredentials } from 'src/storage'
import getConfig from 'next/config'

const {
	publicRuntimeConfig : {
		CANONICAL_URL
	}
} = getConfig()
const baseUrl = typeof CANONICAL_URL !== 'undefined' ? CANONICAL_URL : ''

export default () => createSelector(
	[
		makeStringSelector('user.url'),
		storageUserSelector(),
		storageCredentialsSelector()
	],
	(
		userUrl,
		user,
		credentials,
	) => {
		if (!credentials || !user) {
			return ''
		}
		const backend = resolveBackendFromCredentials(credentials)
		if (!backend) {
			return ''
		}

		if (backend.prefix === 'sb') {
			return `${CANONICAL_URL}${userUrl}?u=${backend.prefix}/${user.username}`
		}
	}
)

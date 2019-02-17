import { createSelector } from 'reselect'
import makeInternalUrlStringSelector from 'src/selectors/makeInternalUrlStringSelector'
import rootPathSelector from 'src/selectors/rootPathSelector'
import storageUserSelector from 'src/selectors/storageUserSelector'
import storageCredentialsSelector from 'src/selectors/storageCredentialsSelector'
import { resolveBackendFromCredentials } from 'src/storage'
import getConfig from 'next/config'

const {
	publicRuntimeConfig : {
		CANONICAL_URL
	}
} = getConfig()

export default () => createSelector(
	[
		makeInternalUrlStringSelector('user.url'),
		rootPathSelector(),
		storageUserSelector(),
		storageCredentialsSelector()
	],
	(
		userUrl,
		rootPath,
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
			return `${CANONICAL_URL}${rootPath}${userUrl}?u=${backend.prefix}/${user.username}`
		}

		return ''
	}
)

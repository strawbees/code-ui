import { createSelector } from 'reselect'
import makeStringSelector from 'src/selectors/makeStringSelector'
import storageUserSelector from 'src/selectors/storageUserSelector'
import storageCredentialsSelector from 'src/selectors/storageCredentialsSelector'
import { resolveBackendFromCredentials } from 'src/storage'
import getConfig from 'next/config'

const {
	publicRuntimeConfig : {
		CANONICAL_URL,
		SHARE_LINKS_OMIT_ROOT_PATH,
		ROOT_PATH,
	}
} = getConfig()
const baseUrl = typeof CANONICAL_URL !== 'undefined' ? CANONICAL_URL : ''

const selector = () => createSelector(
	[
		makeStringSelector('routes.user'),
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
			let url = `${userUrl}?u=${backend.prefix}/${user.username}`
			if (ROOT_PATH && SHARE_LINKS_OMIT_ROOT_PATH && url.indexOf(ROOT_PATH) === 0) {
				url = url.replace(ROOT_PATH, '')
			}
			url = `${baseUrl}${url}`
			return url
		}

		return ''
	}
)

export default selector

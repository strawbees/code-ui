import { createSelector } from 'reselect'
import stateSelector from 'src/selectors/stateSelector'
import makeStringSelector from 'src/selectors/makeStringSelector'
import propsSelector from 'src/selectors/propsSelector'
import { resolveBackendFromProgramId } from 'src/storage'
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
		stateSelector(),
		propsSelector(),
	],
	(
		state,
		{
			id,
			type,
		},
	) => {
		const storageBackend = resolveBackendFromProgramId(id)
		if (storageBackend && storageBackend.name !== 'local') {
			let url = `${makeStringSelector(`routes.${type}`)(state)}?p=${id}`
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

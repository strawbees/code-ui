import LZString from 'lz-string'
import { createSelector } from 'reselect'
import stateSelector from 'src/selectors/stateSelector'
import makeStringSelector from 'src/selectors/makeStringSelector'
import propsSelector from 'src/selectors/propsSelector'
import getConfig from 'next/config'

const {
	publicRuntimeConfig : {
		CANONICAL_URL,
		SHARE_LINKS_OMIT_ROOT_PATH,
		ROOT_PATH,
	}
} = getConfig()
const baseUrl = typeof CANONICAL_URL !== 'undefined' ? CANONICAL_URL : ''

export default () => createSelector(
	[
		stateSelector(),
		propsSelector(),
	],
	(
		state,
		{
			name,
			type,
			source
		},
	) => {
		let url = `${makeStringSelector(`routes.${type}`)(state)}?data=`
		if (ROOT_PATH && SHARE_LINKS_OMIT_ROOT_PATH && url.indexOf(ROOT_PATH) === 0) {
			url = url.replace(ROOT_PATH, '')
		}
		url = `${baseUrl}${url}`
		url += LZString.compressToEncodedURIComponent(JSON.stringify({
			name,
			type,
			source
		}))
		return url
	}
)

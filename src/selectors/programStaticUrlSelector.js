import LZString from 'lz-string'
import { createSelector } from 'reselect'
import stateSelector from 'src/selectors/stateSelector'
import makeInternalUrlStringSelector from 'src/selectors/makeInternalUrlStringSelector'
import propsSelector from 'src/selectors/propsSelector'
import getConfig from 'next/config'

const {
	publicRuntimeConfig : {
		CANONICAL_URL
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
		let url = `${baseUrl}${makeInternalUrlStringSelector(`${type}.url`)(state)}?data=`
		url += LZString.compressToEncodedURIComponent(JSON.stringify({
			name,
			type,
			source
		}))
		return url
	}
)

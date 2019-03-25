import LZString from 'lz-string'
import { createSelector } from 'reselect'
import stateSelector from 'src/selectors/stateSelector'
import propsSelector from 'src/selectors/propsSelector'
import makeStringSelector from 'src/selectors/makeStringSelector'

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
		let url = makeStringSelector(`routes.${type}`)(state)
		url += '?data='
		url += LZString.compressToEncodedURIComponent(JSON.stringify({
			name,
			type,
			source
		}))
		return {
			name,
			type,
			url
		}
	}
)

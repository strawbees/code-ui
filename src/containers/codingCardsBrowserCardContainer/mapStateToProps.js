import LZString from 'lz-string'
import { createSelector } from 'reselect'
import stateSelector from 'src/selectors/stateSelector'
import propsSelector from 'src/selectors/propsSelector'
import codingCardsFlowEntrySelector from 'src/selectors/codingCardsFlowEntrySelector'
import codingCardsBlockEntrySelector from 'src/selectors/codingCardsBlockEntrySelector'
import makeStringSelector from 'src/selectors/makeStringSelector'

const mapStateToProps = () => createSelector(
	[
		stateSelector(),
		propsSelector(),
		codingCardsFlowEntrySelector(),
		codingCardsBlockEntrySelector(),
	],
	(
		state,
		{
			type,
		},
		flowEntry,
		blockEntry,
	) => {
		let entry
		switch (type) {
			case 'flow':
				entry = flowEntry
				break
			case 'block':
				entry = blockEntry
				break
			default:
				entry = null
		}
		let programUrl = makeStringSelector(`routes.${type}`)(state)
		programUrl += '?data='
		programUrl += LZString.compressToEncodedURIComponent(JSON.stringify({
			name   : entry && entry.title,
			source : entry && entry.source,
			type,
		}))
		return {
			entry,
			programUrl,
		}
	}
)

export default mapStateToProps

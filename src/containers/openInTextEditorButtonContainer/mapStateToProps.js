import { createSelector } from 'reselect'
import LZString from 'lz-string'
import stateSelector from 'src/selectors/stateSelector'
import refEditorNameSelector from 'src/selectors/refEditorNameSelector'
import refEditorGeneratedCodeSelector from 'src/selectors/refEditorGeneratedCodeSelector'
import makeInternalUrlStringSelector from 'src/selectors/makeInternalUrlStringSelector'

export default () => createSelector(
	[
		stateSelector(),
		refEditorNameSelector(),
		refEditorGeneratedCodeSelector(),
	],
	(
		state,
		name,
		generatedCode,
	) => {
		const program = {
			name,
			type   : 'text',
			source : generatedCode,
		}
		let url = makeInternalUrlStringSelector('text.url')(state)
		url += '?data='
		url += LZString.compressToEncodedURIComponent(JSON.stringify(program))
		return {
			url
		}
	}
)

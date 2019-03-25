import { createSelector } from 'reselect'
import LZString from 'lz-string'
import stateSelector from 'src/selectors/stateSelector'
import refEditorNameSelector from 'src/selectors/refEditorNameSelector'
import refEditorGeneratedCodeSelector from 'src/selectors/refEditorGeneratedCodeSelector'
import makeStringSelector from 'src/selectors/makeStringSelector'

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
		let url = makeStringSelector('routes.text')(state)
		url += '?data='
		url += LZString.compressToEncodedURIComponent(JSON.stringify(program))
		return {
			url
		}
	}
)

import { createSelector } from 'reselect'
import refEditorTypeSelector from 'src/selectors/refEditorTypeSelector'
import refEditorSavedSelector from 'src/selectors/refEditorSavedSelector'
import refEditorNameSelector from 'src/selectors/refEditorNameSelector'
import refEditorSourceSelector from 'src/selectors/refEditorSourceSelector'
import refEditorDefaultSourceSelector from 'src/selectors/refEditorDefaultSourceSelector'

const selector = () => createSelector(
	[
		refEditorTypeSelector(),
		refEditorSavedSelector(),
		refEditorNameSelector(),
		refEditorSourceSelector(),
		refEditorDefaultSourceSelector(),
	],
	(
		type,
		saved,
		name,
		source,
		defaultSource,
	) => {
		if (!type || saved) {
			return false
		}
		if (name) {
			return true
		}
		// Special case for flow
		if (type === 'flow') {
			if (source && source.length) {
				return true
			}
			return false
		}
		// for others, just compare the sources
		return source !== defaultSource
	}
)

export default selector

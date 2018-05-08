import { createSelector } from 'reselect'
import refEditorTypeSelector from 'src/selectors/refEditorTypeSelector'
import refEditorSourceSelector from 'src/selectors/refEditorSourceSelector'

import generateScratchCode from 'src/editors/scratch/utils/generateCode'

export default createSelector(
	[
		refEditorTypeSelector,
		refEditorSourceSelector,
	],
	(
		type,
		source
	) => {
		switch (type) {
			case 'flow':
				return ''
			case 'scratch':
				return generateScratchCode(source)
			case 'text':
				return source
			default:
				return ''
		}
	}
)

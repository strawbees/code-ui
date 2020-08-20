import { createSelector } from 'reselect'
import refEditorTypeSelector from 'src/selectors/refEditorTypeSelector'
import generateNewProgramSource from 'src/utils/generateNewProgramSource'

const selector = () => createSelector(
	[
		refEditorTypeSelector(),
	],
	(
		type,
	) => generateNewProgramSource(type)
)

export default selector

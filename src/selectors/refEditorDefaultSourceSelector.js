import { createSelector } from 'reselect'
import refEditorTypeSelector from 'src/selectors/refEditorTypeSelector'
import generateNewProgramSource from 'src/utils/generateNewProgramSource'

export default () => createSelector(
	[
		refEditorTypeSelector(),
	],
	(
		type,
	) => generateNewProgramSource(type)
)

import { createSelector } from 'reselect'
import refEditorTypeSelector from 'src/selectors/refEditorTypeSelector'
import generateNewProgramSource from 'src/utils/generateNewProgramSource'

const refEditorDefaultSourceSelector = () => createSelector(
	[
		refEditorTypeSelector(),
	],
	(
		type,
	) => generateNewProgramSource(type)
)

export default refEditorDefaultSourceSelector

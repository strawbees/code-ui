import { createSelector } from 'reselect'
import compilerEntrySelector from 'src/selectors/compilerEntrySelector'

const compilerSuccessSelector = () => createSelector(
	[
		compilerEntrySelector(),
	],
	(
		compilerEntry,
	) => compilerEntry.success
)

export default compilerSuccessSelector

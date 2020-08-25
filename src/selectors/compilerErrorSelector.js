import { createSelector } from 'reselect'
import compilerEntrySelector from 'src/selectors/compilerEntrySelector'

const compilerErrorSelector = () => createSelector(
	[
		compilerEntrySelector(),
	],
	(
		compilerEntry,
	) => compilerEntry.error
)

export default compilerErrorSelector

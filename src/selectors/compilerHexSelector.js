import { createSelector } from 'reselect'
import compilerEntrySelector from 'src/selectors/compilerEntrySelector'

const compilerHexSelector = () => createSelector(
	[
		compilerEntrySelector(),
	],
	(
		compilerEntry,
	) => compilerEntry.hex
)

export default compilerHexSelector

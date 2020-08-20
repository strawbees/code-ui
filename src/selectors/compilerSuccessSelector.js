import { createSelector } from 'reselect'
import compilerEntrySelector from 'src/selectors/compilerEntrySelector'

const selector = () => createSelector(
	[
		compilerEntrySelector(),
	],
	(
		compilerEntry,
	) => compilerEntry.success
)

export default selector

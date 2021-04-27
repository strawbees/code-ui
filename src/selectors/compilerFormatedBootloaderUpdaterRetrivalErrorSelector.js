import { createSelector } from 'reselect'
import stateSelector from 'src/selectors/stateSelector'
import compilerBootloaderUpdaterRetrivalErrorSelector from 'src/selectors/compilerBootloaderUpdaterRetrivalErrorSelector'
import makeStringSelector from 'src/selectors/makeStringSelector'

const compilerFormatedBootloaderUpdaterRetrivalErrorSelector = () => createSelector(
	[
		stateSelector(),
		compilerBootloaderUpdaterRetrivalErrorSelector(),
	],
	(
		state,
		error,
	) => {
		if (!error) {
			return null
		}
		switch (error) {
			case 'UNHANDLED':
			case 'CONNECTION':
			case 'TIMEOUT':
			case 'SERVER':
				return makeStringSelector(`ui.board.upload.compiler.error.${error}`)(state)
			default:
				return makeStringSelector('ui.board.upload.compiler.error.UNHANDLED')(state)
		}
	}
)

export default compilerFormatedBootloaderUpdaterRetrivalErrorSelector

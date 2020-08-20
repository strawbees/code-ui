import { createSelector } from 'reselect'
import stateSelector from 'src/selectors/stateSelector'
import compilerErrorSelector from 'src/selectors/compilerErrorSelector'
import makeStringSelector from 'src/selectors/makeStringSelector'

const selector = () => createSelector(
	[
		stateSelector(),
		compilerErrorSelector(),
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
			case 'ROM_MAX':
			case 'RAM_MAX':
			case 'COMPILATION_ERROR':
				return makeStringSelector(`ui.board.upload.compiler.error.${error}`)(state)
			default:
				return makeStringSelector('ui.board.upload.compiler.error.UNHANDLED')(state)
		}
	}
)

export default selector

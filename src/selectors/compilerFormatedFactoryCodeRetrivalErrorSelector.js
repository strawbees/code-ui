import { createSelector } from 'reselect'
import stateSelector from 'src/selectors/stateSelector'
import compilerFactoryCodeRetrivalErrorSelector from 'src/selectors/compilerFactoryCodeRetrivalErrorSelector'
import makeStringSelector from 'src/selectors/makeStringSelector'

const compilerFormatedFactoryCodeRetrivalErrorSelector = () => createSelector(
	[
		stateSelector(),
		compilerFactoryCodeRetrivalErrorSelector(),
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

export default compilerFormatedFactoryCodeRetrivalErrorSelector

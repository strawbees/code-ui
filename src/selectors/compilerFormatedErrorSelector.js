import { createSelector } from 'reselect'
import compilerErrorSelector from 'src/selectors/compilerErrorSelector'

export default createSelector(
	[
		compilerErrorSelector
	],
	(
		compilerError
	) => compilerError
)

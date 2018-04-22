import { createSelector } from 'reselect'
import qbmidiRuntimeIdListSelector from 'src/selectors/qbmidiRuntimeIdListSelector'
import compilerFormatedErrorSelector from 'src/selectors/compilerErrorSelector'
import compilerHexSelector from 'src/selectors/compilerHexSelector'

export default createSelector(
	[
		qbmidiRuntimeIdListSelector,
		compilerFormatedErrorSelector,
		compilerHexSelector,
	],
	(
		qbmidiRuntimeIdList,
		compilerFormatedError,
		compilerHex,
	) => ({
		boards : qbmidiRuntimeIdList,
		error  : compilerFormatedError,
		hex    : compilerHex,
	})
)

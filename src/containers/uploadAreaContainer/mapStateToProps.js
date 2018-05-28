import { createSelector } from 'reselect'
import qbmidiRuntimeIdListSelector from 'src/selectors/qbmidiRuntimeIdListSelector'
import compilerFormatedErrorSelector from 'src/selectors/compilerErrorSelector'
import uploaderLastErrorSelector from 'src/selectors/uploaderLastErrorSelector'
import compilerHexSelector from 'src/selectors/compilerHexSelector'

export default () => createSelector(
	[
		qbmidiRuntimeIdListSelector(),
		compilerFormatedErrorSelector(),
		uploaderLastErrorSelector(),
		compilerHexSelector(),
	],
	(
		boardIds,
		compilerError,
		uploaderError,
		hex,
	) => ({
		boardIds,
		compilerError,
		uploaderError,
		hex,
	})
)

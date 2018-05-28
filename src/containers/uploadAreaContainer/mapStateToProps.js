import { createStructuredSelector } from 'reselect'
import qbmidiRuntimeIdListSelector from 'src/selectors/qbmidiRuntimeIdListSelector'
import compilerFormatedErrorSelector from 'src/selectors/compilerErrorSelector'
import uploaderLastErrorSelector from 'src/selectors/uploaderLastErrorSelector'
import compilerHexSelector from 'src/selectors/compilerHexSelector'

export default () => createStructuredSelector({
	boardIds      : qbmidiRuntimeIdListSelector(),
	compilerError : compilerFormatedErrorSelector(),
	uploaderError : uploaderLastErrorSelector(),
	hex           : compilerHexSelector(),
})

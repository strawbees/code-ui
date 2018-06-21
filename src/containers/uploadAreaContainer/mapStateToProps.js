import { createStructuredSelector } from 'reselect'
import qbmidiRuntimeIdListSelector from 'src/selectors/qbmidiRuntimeIdListSelector'
import compilerFormatedErrorSelector from 'src/selectors/compilerFormatedErrorSelector'
import uploaderFormatedLastErrorSelector from 'src/selectors/uploaderFormatedLastErrorSelector'
import compilerHexSelector from 'src/selectors/compilerHexSelector'

export default () => createStructuredSelector({
	boardIds      : qbmidiRuntimeIdListSelector(),
	compilerError : compilerFormatedErrorSelector(),
	uploaderError : uploaderFormatedLastErrorSelector(),
	hex           : compilerHexSelector(),
})

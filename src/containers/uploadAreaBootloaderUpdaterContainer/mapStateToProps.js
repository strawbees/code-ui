import { createStructuredSelector } from 'reselect'
import qbcompoundRuntimeIdListSelector from 'src/selectors/qbcompoundRuntimeIdListSelector'
import compilerFormatedBootloaderUpdaterRetrivalErrorSelector from 'src/selectors/compilerFormatedBootloaderUpdaterRetrivalErrorSelector'
import uploaderFormatedLastErrorSelector from 'src/selectors/uploaderFormatedLastErrorSelector'
import compilerBootloaderUpdaterHexSelector from 'src/selectors/compilerBootloaderUpdaterHexSelector'

const mapStateToProps = () => createStructuredSelector({
	boardIds      : qbcompoundRuntimeIdListSelector(),
	compilerError : compilerFormatedBootloaderUpdaterRetrivalErrorSelector(),
	uploaderError : uploaderFormatedLastErrorSelector(),
	hex           : compilerBootloaderUpdaterHexSelector(),
})

export default mapStateToProps

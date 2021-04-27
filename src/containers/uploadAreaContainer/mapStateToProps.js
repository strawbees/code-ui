import { createStructuredSelector } from 'reselect'
import qbcompoundRuntimeIdListSelector from 'src/selectors/qbcompoundRuntimeIdListSelector'
import compilerFormatedErrorSelector from 'src/selectors/compilerFormatedErrorSelector'
import uploaderFormatedLastErrorSelector from 'src/selectors/uploaderFormatedLastErrorSelector'
import compilerBootloaderUpdaterHexSelector from 'src/selectors/compilerBootloaderUpdaterHexSelector'
import compilerHexSelector from 'src/selectors/compilerHexSelector'

const mapStateToProps = () => createStructuredSelector({
	boardIds             : qbcompoundRuntimeIdListSelector(),
	compilerError        : compilerFormatedErrorSelector(),
	uploaderError        : uploaderFormatedLastErrorSelector(),
	bootloaderUpdaterHex : compilerBootloaderUpdaterHexSelector(),
	hex                  : compilerHexSelector(),
})

export default mapStateToProps

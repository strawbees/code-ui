import { createStructuredSelector } from 'reselect'
import qbcompoundRuntimeIdListSelector from 'src/selectors/qbcompoundRuntimeIdListSelector'
import compilerFormatedBootloaderUpdaterRetrivalErrorSelector from 'src/selectors/compilerFormatedBootloaderUpdaterRetrivalErrorSelector'
import compilerFormatedFactoryCodeRetrivalErrorSelector from 'src/selectors/compilerFormatedFactoryCodeRetrivalErrorSelector'
import uploaderFormatedLastErrorSelector from 'src/selectors/uploaderFormatedLastErrorSelector'
import compilerBootloaderUpdaterHexSelector from 'src/selectors/compilerBootloaderUpdaterHexSelector'
import compilerFactoryCodeHexSelector from 'src/selectors/compilerFactoryCodeHexSelector'

const mapStateToProps = () => createStructuredSelector({
	boardIds                       : qbcompoundRuntimeIdListSelector(),
	compilerBootloaderUpdaterError : compilerFormatedBootloaderUpdaterRetrivalErrorSelector(),
	compilerFactoryCodeError       : compilerFormatedFactoryCodeRetrivalErrorSelector(),
	uploaderError                  : uploaderFormatedLastErrorSelector(),
	bootloaderUpdaterHex           : compilerBootloaderUpdaterHexSelector(),
	factoryCodeHex                 : compilerFactoryCodeHexSelector(),
})

export default mapStateToProps

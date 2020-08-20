import { createStructuredSelector } from 'reselect'
import qbcompoundRuntimeIdListSelector from 'src/selectors/qbcompoundRuntimeIdListSelector'
import compilerFormatedErrorSelector from 'src/selectors/compilerFormatedErrorSelector'
import uploaderFormatedLastErrorSelector from 'src/selectors/uploaderFormatedLastErrorSelector'
import compilerHexSelector from 'src/selectors/compilerHexSelector'

const mapStateToProps = () => createStructuredSelector({
	boardIds      : qbcompoundRuntimeIdListSelector(),
	compilerError : compilerFormatedErrorSelector(),
	uploaderError : uploaderFormatedLastErrorSelector(),
	hex           : compilerHexSelector(),
})

export default mapStateToProps

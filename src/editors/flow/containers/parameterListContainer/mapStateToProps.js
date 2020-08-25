import { createStructuredSelector } from 'reselect'
import instanceParameterIdsSelector from 'src/editors/flow/selectors/instanceParameterIdsSelector'

const mapStateToProps = () => createStructuredSelector({
	parameterIds : instanceParameterIdsSelector(),
})

export default mapStateToProps

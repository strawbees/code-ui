import { createStructuredSelector } from 'reselect'
import instanceParameterIdsSelector from 'src/editors/flow/selectors/instanceParameterIdsSelector'

export default () => createStructuredSelector({
	parameterIds : instanceParameterIdsSelector(),
})

import { createStructuredSelector } from 'reselect'
import parameterValueCodeSelector from 'src/editors/flow/selectors/parameterValueCodeSelector'
import parameterValueDisplaySelector from 'src/editors/flow/selectors/parameterValueDisplaySelector'

export default () => createStructuredSelector({
	valueCode    : parameterValueCodeSelector(),
	valueDisplay : parameterValueDisplaySelector(),
})

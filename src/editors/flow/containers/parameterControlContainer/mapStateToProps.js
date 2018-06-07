import { createStructuredSelector } from 'reselect'
import parameterValueCodeSelector from 'src/editors/flow/selectors/parameterValueCodeSelector'
import parameterValidationParsedSelector from 'src/editors/flow/selectors/parameterValidationParsedSelector'
import parameterColorSelector from 'src/editors/flow/selectors/parameterColorSelector'

export default () => createStructuredSelector({
	valueCode  : parameterValueCodeSelector(),
	validation : parameterValidationParsedSelector(),
	color      : parameterColorSelector()
})

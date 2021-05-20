import { createStructuredSelector } from 'reselect'
import parameterValueCodeSelector from 'src/editors/flow/selectors/parameterValueCodeSelector'
import parameterValidationParsedSelector from 'src/editors/flow/selectors/parameterValidationParsedSelector'
import parameterColorSelector from 'src/editors/flow/selectors/parameterColorSelector'

const mapStateToProps = () => createStructuredSelector({
	valueCode  : parameterValueCodeSelector(),
	validation : parameterValidationParsedSelector(),
	color      : parameterColorSelector(),
})

export default mapStateToProps

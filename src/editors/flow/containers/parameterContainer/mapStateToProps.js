import { createStructuredSelector } from 'reselect'
import parameterNameSelector from 'src/editors/flow/selectors/parameterNameSelector'
import parameterDefaultValueSelector from 'src/editors/flow/selectors/parameterDefaultValueSelector'
import parameterIsMultipleSelector from 'src/editors/flow/selectors/parameterIsMultipleSelector'

export default () => createStructuredSelector({
	name         : parameterNameSelector(),
	defaultValue : parameterDefaultValueSelector(),
	isMultiple   : parameterIsMultipleSelector(),
})

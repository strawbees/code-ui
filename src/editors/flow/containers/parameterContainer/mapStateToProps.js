import { createStructuredSelector } from 'reselect'
import parameterNameSelector from 'src/editors/flow/selectors/parameterNameSelector'
import parameterIsMultipleSelector from 'src/editors/flow/selectors/parameterIsMultipleSelector'
import parameterNumItemsSelector from 'src/editors/flow/selectors/parameterNumItemsSelector'

const mapStateToProps = () => createStructuredSelector({
	name       : parameterNameSelector(),
	isMultiple : parameterIsMultipleSelector(),
	numItems   : parameterNumItemsSelector(),
})

export default mapStateToProps

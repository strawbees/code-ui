import { createStructuredSelector } from 'reselect'
import parameterIsConnectedSelector from 'src/editors/flow/selectors/parameterIsConnectedSelector'
import parameterIsHighlightedSelector from 'src/editors/flow/selectors/parameterIsHighlightedSelector'

export default () => createStructuredSelector({
	connected   : parameterIsConnectedSelector(),
	highlighted : parameterIsHighlightedSelector()
})

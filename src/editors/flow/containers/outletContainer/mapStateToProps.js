import { createStructuredSelector } from 'reselect'
import outletNameSelector from 'src/editors/flow/selectors/outletNameSelector'

export default () => createStructuredSelector({
	name : outletNameSelector(),
})

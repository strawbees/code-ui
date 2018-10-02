import { createStructuredSelector } from 'reselect'
import instanceOutletIdsSelector from 'src/editors/flow/selectors/instanceOutletIdsSelector'

export default () => createStructuredSelector({
	outletIds : instanceOutletIdsSelector(),
})

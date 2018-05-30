import { createStructuredSelector } from 'reselect'
import instanceNodeNameSelector from 'src/editors/flow/selectors/instanceNodeNameSelector'
import instanceColorSelector from 'src/editors/flow/selectors/instanceColorSelector'
import instanceIconSelector from 'src/editors/flow/selectors/instanceIconSelector'
import instanceParameterIdsSelector from 'src/editors/flow/selectors/instanceParameterIdsSelector'
import instanceOutletIdsSelector from 'src/editors/flow/selectors/instanceOutletIdsSelector'

export default () => createStructuredSelector({
	nodeName     : instanceNodeNameSelector(),
	color        : instanceColorSelector(),
	icon         : instanceIconSelector(),
	parameterIds : instanceParameterIdsSelector(),
	outletIds    : instanceOutletIdsSelector(),
})

import { createStructuredSelector } from 'reselect'
import instanceNodeNameSelector from 'src/editors/flow/selectors/instanceNodeNameSelector'
import instanceColorSelector from 'src/editors/flow/selectors/instanceColorSelector'
import instanceIconSelector from 'src/editors/flow/selectors/instanceIconSelector'

export default () => createStructuredSelector({
	nodeName : instanceNodeNameSelector(),
	color    : instanceColorSelector(),
	icon     : instanceIconSelector(),
})

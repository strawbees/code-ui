import { createStructuredSelector } from 'reselect'
import instanceNameSelector from 'src/editors/flow/selectors/instanceNameSelector'

export default () => createStructuredSelector({
	name : instanceNameSelector(),
})

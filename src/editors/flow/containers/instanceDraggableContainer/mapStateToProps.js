import { createStructuredSelector } from 'reselect'
import instanceXSelector from 'src/editors/flow/selectors/instanceXSelector'
import instanceYSelector from 'src/editors/flow/selectors/instanceYSelector'

export default () => createStructuredSelector({
	x : instanceXSelector(),
	y : instanceYSelector(),
})

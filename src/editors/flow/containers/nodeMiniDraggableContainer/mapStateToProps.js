import { createStructuredSelector } from 'reselect'
import nodeNameSelector from 'src/editors/flow/selectors/nodeNameSelector'
import nodeColorSelector from 'src/editors/flow/selectors/nodeColorSelector'
import nodeIconSelector from 'src/editors/flow/selectors/nodeIconSelector'
import dropAreaRectGetterSelector from 'src/editors/flow/selectors/dropAreaRectGetterSelector'

const mapStateToProps = () => createStructuredSelector({
	name            : nodeNameSelector(),
	color           : nodeColorSelector(),
	icon            : nodeIconSelector(),
	getDropAreaRect : dropAreaRectGetterSelector(),
})

export default mapStateToProps

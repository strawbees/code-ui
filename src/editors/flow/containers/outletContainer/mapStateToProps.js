import { createStructuredSelector } from 'reselect'
import outletNameSelector from 'src/editors/flow/selectors/outletNameSelector'

const mapStateToProps = () => createStructuredSelector({
	name : outletNameSelector(),
})

export default mapStateToProps

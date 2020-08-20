import { createStructuredSelector } from 'reselect'
import instanceOutletIdsSelector from 'src/editors/flow/selectors/instanceOutletIdsSelector'

const mapStateToProps = () => createStructuredSelector({
	outletIds : instanceOutletIdsSelector(),
})

export default mapStateToProps

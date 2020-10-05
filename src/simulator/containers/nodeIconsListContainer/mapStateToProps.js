import { createStructuredSelector } from 'reselect'
import internalDataNodeIdsSelector from '../../selectors/internalDataNodeIdsSelector'

const mapStateToProps = () => createStructuredSelector({
	internalDataNodeIds : internalDataNodeIdsSelector(),
})

export default mapStateToProps

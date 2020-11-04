import { createStructuredSelector } from 'reselect'
import internalDataNodeIdsStringSelector from '../../selectors/internalDataNodeIdsStringSelector'

const mapStateToProps = () => createStructuredSelector({
	internalDataNodeIds : internalDataNodeIdsStringSelector(),
})

export default mapStateToProps

import { createStructuredSelector } from 'reselect'
import internalDataNodeIdsStringSelector from '../../selectors/internalDataNodeIdsStringSelector'

const mapStateToProps = () => createStructuredSelector({
	internalDataNodeIdsString : internalDataNodeIdsStringSelector(),
})

export default mapStateToProps

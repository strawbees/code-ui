import { createStructuredSelector } from 'reselect'
import internalDataIdsSelector from '../../selectors/internalDataIdsSelector'

const mapStateToProps = () => createStructuredSelector({
	internalDataIds : internalDataIdsSelector(),
})

export default mapStateToProps

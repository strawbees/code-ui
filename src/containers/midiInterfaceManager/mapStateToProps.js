import { createStructuredSelector } from 'reselect'
import qbmidiAvailableSelector from 'src/selectors/qbmidiAvailableSelector'
import qbmidiReadySelector from 'src/selectors/qbmidiReadySelector'

const mapStateToProps = () => createStructuredSelector({
	available : qbmidiAvailableSelector(),
	ready     : qbmidiReadySelector(),
})

export default mapStateToProps

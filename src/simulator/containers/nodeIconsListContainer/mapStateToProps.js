import { createStructuredSelector } from 'reselect'
import reportIdsSelector from '../../selectors/reportIdsSelector'

const mapStateToProps = () => createStructuredSelector({
	reportIds : reportIdsSelector(),
})

export default mapStateToProps

import { createStructuredSelector } from 'reselect'
import reportSelector from '../../../selectors/reportSelector'

const mapStateToProps = () => createStructuredSelector({
	report : reportSelector(),
})

export default mapStateToProps

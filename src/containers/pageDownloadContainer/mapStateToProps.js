import { createStructuredSelector } from 'reselect'
import setupOSSelector from 'src/selectors/setupOSSelector'

const mapStateToProps = () => createStructuredSelector({
	setupOS : setupOSSelector(),
})

export default mapStateToProps

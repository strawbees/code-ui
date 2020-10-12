import { createStructuredSelector } from 'reselect'
import isSimulatorVisibleSelector from 'src/simulator/selectors/isSimulatorVisibleSelector'

const mapStateToProps = () => createStructuredSelector({
	isSimulatorVisible : isSimulatorVisibleSelector(),
})

export default mapStateToProps

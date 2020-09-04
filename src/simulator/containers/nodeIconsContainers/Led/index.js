import { connect } from 'react-redux'
import Led from '../../../components/nodeIcons/Led'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const LedContainer = (props) =>
	<Led
		{...props}
	/>

const LedContainerConnected = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(LedContainer)

export default LedContainerConnected

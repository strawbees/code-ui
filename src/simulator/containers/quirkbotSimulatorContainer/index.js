import { connect } from 'react-redux'
import QuirkbotSimulator from '../../components/quirkbotSimulator'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const QuirkbotSimulatorContainer = (props) =>
	<QuirkbotSimulator
		{...props}
	/>

const quirkbotSimulatorContainerConnected = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(QuirkbotSimulatorContainer)

export default quirkbotSimulatorContainerConnected

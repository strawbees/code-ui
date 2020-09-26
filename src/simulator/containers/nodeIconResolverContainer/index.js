import { connect } from 'react-redux'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

// Inputs
// import AnalogSensorContainer from '../nodeIconsContainers/AnalogSensor'
// import DigitalSensorContainer from '../nodeIconsContainers/DigitalSensor'
import CircuitTouchContainer from '../nodeIconsContainers/CircuitTouch'
// import SqueezeSensorContainer from '../nodeIconsContainers/SqueezeSensor'
// import IRProximityContainer from '../nodeIconsContainers/IRProximity'
// import LightSensorContainer from '../nodeIconsContainers/LightSensor'
// import SonarContainer from '../nodeIconsContainers/Sonar'

// Brains
// import ConverterContainer from '../nodeIconsContainers/Converter'
// import ComparisonContainer from '../nodeIconsContainers/Comparison'
// import ConstrainContainer from '../nodeIconsContainers/Constrain'
// import CounterContainer from '../nodeIconsContainers/Counter'
// import GateContainer from '../nodeIconsContainers/Gate'
// import ListContainer from '../nodeIconsContainers/List'
// import LogicContainer from '../nodeIconsContainers/Logic'
// import MathContainer from '../nodeIconsContainers/Math'
// import RandomizerContainer from '../nodeIconsContainers/Randomizer'
// import SequenceContainer from '../nodeIconsContainers/Sequence'
// import StatisticsContainer from '../nodeIconsContainers/Statistics'
import WaveContainer from '../nodeIconsContainers/Wave'

// Outputs
import LedContainer from '../nodeIconsContainers/Led'
// import DualColorLedContainer from '../nodeIconsContainers/DualColorLed'
// import ServoMotorContainer from '../nodeIconsContainers/ServoMotor'
// import ContinuousServoContainer from '../nodeIconsContainers/ContinuousServo'
// import BuzzerContainer from '../nodeIconsContainers/Buzzer'
// import RGBLedContainer from '../nodeIconsContainers/RGBLed'
// import KeyPressContainer from '../nodeIconsContainers/KeyPress'
// import KeySequenceContainer from '../nodeIconsContainers/KeySequence'
// import VoltageOutputContainer from '../nodeIconsContainers/VoltageOutput'

// Debug
// import SystemMemoryContainer from '../nodeIconsContainers/SystemMemory'
// import SerialMonitorContainer from '../nodeIconsContainers/SerialMonitor'
// import TimeContainer from '../nodeIconsContainers/Time'

const NodeIconResolverContainer = ({
	nodeType,
	id,
}) => {
	let NodeIconContainer
	switch (nodeType) {
		// case 'AnalogSensor':
		// 	NodeIconContainer = AnalogSensorContainer
		// 	break
		// case 'DigitalSensor':
		// 	NodeIconContainer = DigitalSensorContainer
		// 	break
		case 'CircuitTouch':
			NodeIconContainer = CircuitTouchContainer
			break
		// case 'SqueezeSensor':
		// 	NodeIconContainer = SqueezeSensorContainer
		// 	break
		// case 'IRProximity':
		// 	NodeIconContainer = IRProximityContainer
		// 	break
		// case 'LightSensor':
		// 	NodeIconContainer = LightSensorContainer
		// 	break
		// case 'Sonar':
		// 	NodeIconContainer = SonarContainer
		// 	break
		// case 'Converter':
		// 	NodeIconContainer = ConverterContainer
		// 	break
		// case 'Comparison':
		// 	NodeIconContainer = ComparisonContainer
		// 	break
		// case 'Constrain':
		// 	NodeIconContainer = ConstrainContainer
		// 	break
		// case 'Counter':
		// 	NodeIconContainer = CounterContainer
		// 	break
		// case 'Gate':
		// 	NodeIconContainer = GateContainer
		// 	break
		// case 'List':
		// 	NodeIconContainer = ListContainer
		// 	break
		// case 'Logic':
		// 	NodeIconContainer = LogicContainer
		// 	break
		// case 'Math':
		// 	NodeIconContainer = MathContainer
		// 	break
		// case 'Randomizer':
		// 	NodeIconContainer = RandomizerContainer
		// 	break
		// case 'Sequence':
		// 	NodeIconContainer = SequenceContainer
		// 	break
		// case 'Statistics':
		// 	NodeIconContainer = StatisticsContainer
		// 	break
		case 'Wave':
			NodeIconContainer = WaveContainer
			break
		case 'Led':
			NodeIconContainer = LedContainer
			break
		// case 'DualColorLed':
		// 	NodeIconContainer = DualColorLedContainer
		// 	break
		// case 'ServoMotor':
		// 	NodeIconContainer = ServoMotorContainer
		// 	break
		// case 'ContinuousServo':
		// 	NodeIconContainer = ContinuousServoContainer
		// 	break
		// case 'Buzzer':
		// 	NodeIconContainer = BuzzerContainer
		// 	break
		// case 'RGBLed':
		// 	NodeIconContainer = RGBLedContainer
		// 	break
		// case 'KeyPress':
		// 	NodeIconContainer = KeyPressContainer
		// 	break
		// case 'KeySequence':
		// 	NodeIconContainer = KeySequenceContainer
		// 	break
		// case 'VoltageOutput':
		// 	NodeIconContainer = VoltageOutputContainer
		// 	break
		// case 'SystemMemory':
		// 	NodeIconContainer = SystemMemoryContainer
		// 	break
		// case 'SerialMonitor':
		// 	NodeIconContainer = SerialMonitorContainer
		// 	break
		// case 'Time':
		// 	NodeIconContainer = TimeContainer
		// 	break
		default:
			return null
	}
	return (
		<NodeIconContainer id={id}/>
	)
}
const NodeIconResolverContainerConnected = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(NodeIconResolverContainer)

export default NodeIconResolverContainerConnected

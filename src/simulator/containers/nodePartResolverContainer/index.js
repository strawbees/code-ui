import { connect } from 'react-redux'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

// Inputs
// import AnalogSensorContainer from '../nodePartsContainers/AnalogSensor'
// import DigitalSensorContainer from '../nodePartsContainers/DigitalSensor'
import CircuitTouchContainer from '../nodePartsContainers/CircuitTouch'
// import SqueezeSensorContainer from '../nodePartsContainers/SqueezeSensor'
// import IRProximityContainer from '../nodePartsContainers/IRProximity'
// import LightSensorContainer from '../nodePartsContainers/LightSensor'
// import SonarContainer from '../nodePartsContainers/Sonar'

// Brains
// import ConverterContainer from '../nodePartsContainers/Converter'
// import ComparisonContainer from '../nodePartsContainers/Comparison'
// import ConstrainContainer from '../nodePartsContainers/Constrain'
// import CounterContainer from '../nodePartsContainers/Counter'
// import GateContainer from '../nodePartsContainers/Gate'
// import ListContainer from '../nodePartsContainers/List'
// import LogicContainer from '../nodePartsContainers/Logic'
// import MathContainer from '../nodePartsContainers/Math'
// import RandomizerContainer from '../nodePartsContainers/Randomizer'
// import SequenceContainer from '../nodePartsContainers/Sequence'
// import StatisticsContainer from '../nodePartsContainers/Statistics'
// import WaveContainer from '../nodePartsContainers/Wave'

// Outputs
import LedContainer from '../nodePartsContainers/Led'
// import DualColorLedContainer from '../nodePartsContainers/DualColorLed'
// import ServoMotorContainer from '../nodePartsContainers/ServoMotor'
// import ContinuousServoContainer from '../nodePartsContainers/ContinuousServo'
// import BuzzerContainer from '../nodePartsContainers/Buzzer'
// import RGBLedContainer from '../nodePartsContainers/RGBLed'
// import KeyPressContainer from '../nodePartsContainers/KeyPress'
// import KeySequenceContainer from '../nodePartsContainers/KeySequence'
// import VoltageOutputContainer from '../nodePartsContainers/VoltageOutput'

// Debug
// import SystemMemoryContainer from '../nodePartsContainers/SystemMemory'
// import SerialMonitorContainer from '../nodePartsContainers/SerialMonitor'
// import TimeContainer from '../nodePartsContainers/Time'

const NodePartResolverContainer = ({
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
		// case 'Wave':
		// 	NodeIconContainer = WaveContainer
		// 	break
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
const NodePartResolverContainerConnected = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(NodePartResolverContainer)

export default NodePartResolverContainerConnected

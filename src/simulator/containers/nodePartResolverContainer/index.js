import PropTypes from 'prop-types'
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
import LightSensorContainer from '../nodePartsContainers/LightSensor'
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
import DualColorLedContainer from '../nodePartsContainers/DualColorLed'
import ServoMotorContainer from '../nodePartsContainers/ServoMotor'
import ContinuousServoContainer from '../nodePartsContainers/ContinuousServo'
// import BuzzerContainer from '../nodePartsContainers/Buzzer'
// import RGBLedContainer from '../nodePartsContainers/RGBLed'
import KeyPressContainer from '../nodePartsContainers/KeyPress'
import KeySequenceContainer from '../nodePartsContainers/KeySequence'
// import VoltageOutputContainer from '../nodePartsContainers/VoltageOutput'

// Debug
// import SystemMemoryContainer from '../nodePartsContainers/SystemMemory'
// import SerialMonitorContainer from '../nodePartsContainers/SerialMonitor'
// import TimeContainer from '../nodePartsContainers/Time'

const NodePartResolverContainer = ({
	nodeType,
	id,
	adjustScale,
}) => {
	let NodePartContainer
	switch (nodeType) {
		// case 'AnalogSensor':
		// 	NodePartContainer = AnalogSensorContainer
		// 	break
		// case 'DigitalSensor':
		// 	NodePartContainer = DigitalSensorContainer
		// 	break
		case 'CircuitTouch':
			NodePartContainer = CircuitTouchContainer
			break
		// case 'SqueezeSensor':
		// 	NodePartContainer = SqueezeSensorContainer
		// 	break
		// case 'IRProximity':
		// 	NodePartContainer = IRProximityContainer
		// 	break
		case 'LightSensor':
			NodePartContainer = LightSensorContainer
			break
		// case 'Sonar':
		// 	NodePartContainer = SonarContainer
		// 	break
		// case 'Converter':
		// 	NodePartContainer = ConverterContainer
		// 	break
		// case 'Comparison':
		// 	NodePartContainer = ComparisonContainer
		// 	break
		// case 'Constrain':
		// 	NodePartContainer = ConstrainContainer
		// 	break
		// case 'Counter':
		// 	NodePartContainer = CounterContainer
		// 	break
		// case 'Gate':
		// 	NodePartContainer = GateContainer
		// 	break
		// case 'List':
		// 	NodePartContainer = ListContainer
		// 	break
		// case 'Logic':
		// 	NodePartContainer = LogicContainer
		// 	break
		// case 'Math':
		// 	NodePartContainer = MathContainer
		// 	break
		// case 'Randomizer':
		// 	NodePartContainer = RandomizerContainer
		// 	break
		// case 'Sequence':
		// 	NodePartContainer = SequenceContainer
		// 	break
		// case 'Statistics':
		// 	NodePartContainer = StatisticsContainer
		// 	break
		// case 'Wave':
		// 	NodePartContainer = WaveContainer
		// 	break
		case 'Led':
			NodePartContainer = LedContainer
			break
		case 'DualColorLed':
			NodePartContainer = DualColorLedContainer
			break
		case 'ServoMotor':
			NodePartContainer = ServoMotorContainer
			break
		case 'ContinuousServo':
			NodePartContainer = ContinuousServoContainer
			break
		// case 'Buzzer':
		// 	NodePartContainer = BuzzerContainer
		// 	break
		// case 'RGBLed':
		// 	NodePartContainer = RGBLedContainer
		// 	break
		case 'KeyPress':
			NodePartContainer = KeyPressContainer
			break
		case 'KeySequence':
			NodePartContainer = KeySequenceContainer
			break
		// case 'VoltageOutput':
		// 	NodePartContainer = VoltageOutputContainer
		// 	break
		// case 'SystemMemory':
		// 	NodePartContainer = SystemMemoryContainer
		// 	break
		// case 'SerialMonitor':
		// 	NodePartContainer = SerialMonitorContainer
		// 	break
		// case 'Time':
		// 	NodePartContainer = TimeContainer
		// 	break
		default:
			return null
	}
	return (
		<NodePartContainer id={id} adjustScale={adjustScale}/>
	)
}

NodePartResolverContainer.propTypes = {
	nodeType    : PropTypes.string,
	id          : PropTypes.string,
	adjustScale : PropTypes.number,
}

const NodePartResolverContainerConnected = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(NodePartResolverContainer)

export default NodePartResolverContainerConnected

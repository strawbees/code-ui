import { connect } from 'react-redux'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

// Inputs
// import { AnalogSensor } from '../../components/nodeIcons/AnalogSensor'
// import { DigitalSensor } from '../../components/nodeIcons/DigitalSensor'
// import { CircuitTouch } from '../../components/nodeIcons/CircuitTouch'
// import { SqueezeSensor } from '../../components/nodeIcons/SqueezeSensor'
// import { IRProximity } from '../../components/nodeIcons/IRProximity'
// import { LightSensor } from '../../components/nodeIcons/LightSensor'
// import { Sonar } from '../../components/nodeIcons/Sonar'

// Brains
// import { Converter } from '../../components/nodeIcons/Converter'
// import { Comparison } from '../../components/nodeIcons/Comparison'
// import { Constrain } from '../../components/nodeIcons/Constrain'
// import { Counter } from '../../components/nodeIcons/Counter'
// import { Gate } from '../../components/nodeIcons/Gate'
// import { List } from '../../components/nodeIcons/List'
// import { Logic } from '../../components/nodeIcons/Logic'
// import { Math } from '../../components/nodeIcons/Math'
// import { Randomizer } from '../../components/nodeIcons/Randomizer'
// import { Sequence } from '../../components/nodeIcons/Sequence'
// import { Statistics } from '../../components/nodeIcons/Statistics'
import { Wave } from '../../components/nodeIcons/Wave'

// Outputs
import { Led } from '../../components/nodeIcons/Led'
// import { DualColorLed } from '../../components/nodeIcons/DualColorLed'
// import { ServoMotor } from '../../components/nodeIcons/ServoMotor'
// import { ContinuousServo } from '../../components/nodeIcons/ContinuousServo'
// import { Buzzer } from '../../components/nodeIcons/Buzzer'
// import { RGBLed } from '../../components/nodeIcons/RGBLed'
// import { KeyPress } from '../../components/nodeIcons/KeyPress'
// import { KeySequence } from '../../components/nodeIcons/KeySequence'
// import { VoltageOutput } from '../../components/nodeIcons/VoltageOutput'

// Debug
// import { SystemMemory } from '../../components/nodeIcons/SystemMemory'
// import { SerialMonitor } from '../../components/nodeIcons/SerialMonitor'
// import { Time } from '../../components/nodeIcons/Time'

const NodeIconResolverContainer = ({
	nodeType,
	...props
}) => {
	let NodeIcon
	switch (nodeType) {
		// case 'AnalogSensor':
		//	 NodeIcon = AnalogSensor
		//	 break
		// case 'DigitalSensor':
		//	 NodeIcon = DigitalSensor
		//	 break
		// case 'CircuitTouch':
		//	 NodeIcon = CircuitTouch
		//	 break
		// case 'SqueezeSensor':
		//	 NodeIcon = SqueezeSensor
		//	 break
		// case 'IRProximity':
		//	 NodeIcon = IRProximity
		//	 break
		// case 'LightSensor':
		//	 NodeIcon = LightSensor
		//	 break
		// case 'Sonar':
		//	 NodeIcon = Sonar
		//	 break
		// case 'Converter':
		//	 NodeIcon = Converter
		//	 break
		// case 'Comparison':
		//	 NodeIcon = Comparison
		//	 break
		// case 'Constrain':
		//	 NodeIcon = Constrain
		//	 break
		// case 'Counter':
		//	 NodeIcon = Counter
		//	 break
		// case 'Gate':
		//	 NodeIcon = Gate
		//	 break
		// case 'List':
		//	 NodeIcon = List
		//	 break
		// case 'Logic':
		//	 NodeIcon = Logic
		//	 break
		// case 'Math':
		//	 NodeIcon = Math
		//	 break
		// case 'Randomizer':
		//	 NodeIcon = Randomizer
		//	 break
		// case 'Sequence':
		//	 NodeIcon = Sequence
		//	 break
		// case 'Statistics':
		//	 NodeIcon = Statistics
		//	 break
		case 'Wave':
			NodeIcon = Wave
			break
		case 'Led':
			NodeIcon = Led
			break
		// case 'DualColorLed':
		//	 NodeIcon = DualColorLed
		//	 break
		// case 'ServoMotor':
		//	 NodeIcon = ServoMotor
		//	 break
		// case 'ContinuousServo':
		//	 NodeIcon = ContinuousServo
		//	 break
		// case 'Buzzer':
		//	 NodeIcon = Buzzer
		//	 break
		// case 'RGBLed':
		//	 NodeIcon = RGBLed
		//	 break
		// case 'KeyPress':
		//	 NodeIcon = KeyPress
		//	 break
		// case 'KeySequence':
		//	 NodeIcon = KeySequence
		//	 break
		// case 'VoltageOutput':
		//	 NodeIcon = VoltageOutput
		//	 break
		// case 'SystemMemory':
		//	 NodeIcon = SystemMemory
		//	 break
		// case 'SerialMonitor':
		//	 NodeIcon = SerialMonitor
		//	 break
		// case 'Time':
		//	 NodeIcon = Time
		//	 break
		default:
			return null
	}
	return (
		<NodeIcon
			{...props}
		/>
	)
}
const NodeIconResolverContainerConnected = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(NodeIconResolverContainer)

export default NodeIconResolverContainerConnected

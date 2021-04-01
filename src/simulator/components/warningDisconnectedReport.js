/* eslint-disable camelcase */
import PropTypes from 'prop-types'
import Markdown from 'src/components/markdown'
import Figure from './figure'
import WarningSvg from '../assets/images/general/warning.svg'

import {
	AnalogSensor,
	Buzzer,
	CircuitTouch,
	ContinuousServo,
	DigitalSensor,
	DualColorLed,
	Led,
	LightSensor,
	ServoMotor,
	Sonar,
	SqueezeSensor,
	VoltageOutput,
} from '../lib/quirkbot'

export const WarningDisconnectedReport = ({
	nodeType,
	messageTemplate,
	label_AnalogSensor,
	label_Buzzer,
	label_CircuitTouch,
	label_ContinuousServo,
	label_DigitalSensor,
	label_DualColorLed,
	label_Led,
	label_LightSensor,
	label_ServoMotor,
	label_Sonar,
	label_SqueezeSensor,
	label_VoltageOutput,
}) => {
	switch (nodeType) {
		case AnalogSensor.nodeType:
		case Buzzer.nodeType:
		case CircuitTouch.nodeType:
		case ContinuousServo.nodeType:
		case DigitalSensor.nodeType:
		case DualColorLed.nodeType:
		case Led.nodeType:
		case LightSensor.nodeType:
		case ServoMotor.nodeType:
		case Sonar.nodeType:
		case SqueezeSensor.nodeType:
		case VoltageOutput.nodeType:
			break
		default:
			return null
	}
	const nodeTypeLabels = new Map()
	nodeTypeLabels.set(AnalogSensor.nodeType, label_AnalogSensor)
	nodeTypeLabels.set(Buzzer.nodeType, label_Buzzer)
	nodeTypeLabels.set(CircuitTouch.nodeType, label_CircuitTouch)
	nodeTypeLabels.set(ContinuousServo.nodeType, label_ContinuousServo)
	nodeTypeLabels.set(DigitalSensor.nodeType, label_DigitalSensor)
	nodeTypeLabels.set(DualColorLed.nodeType, label_DualColorLed)
	nodeTypeLabels.set(Led.nodeType, label_Led)
	nodeTypeLabels.set(LightSensor.nodeType, label_LightSensor)
	nodeTypeLabels.set(ServoMotor.nodeType, label_ServoMotor)
	nodeTypeLabels.set(Sonar.nodeType, label_Sonar)
	nodeTypeLabels.set(SqueezeSensor.nodeType, label_SqueezeSensor)
	nodeTypeLabels.set(VoltageOutput.nodeType, label_VoltageOutput)
	const message = messageTemplate.split('%1').join(nodeTypeLabels.get(nodeType))

	return (
		<div className={`root warningDisconnectedReport ${nodeType} `}>
			<style jsx>{`
				.root {
					position: relative;
					background-color: rgba(247, 197, 68, 0.3);
					margin: 0.125rem;
					padding: 0.125rem 0.5rem 0.125rem 1.75rem;
					border-radius: 10px;
				}
				.root :global(.message) {
					font-size: 0.8rem;
				}
				.root :global(.icon) {
					position:absolute;
					left: 11.5px;
					top: 11px;
				}
			`}</style>
			<Figure
				className='icon'
				svg={WarningSvg}
				scale={0.6}
				x={0}
				y={0}
			/>
			<Markdown className='message' source={message}/>
		</div>
	)
}
WarningDisconnectedReport.defaultProps = {
	label_AnalogSensor    : '',
	label_Buzzer          : '',
	label_CircuitTouch    : '',
	label_ContinuousServo : '',
	label_DigitalSensor   : '',
	label_DualColorLed    : '',
	label_Led             : '',
	label_LightSensor     : '',
	label_ServoMotor      : '',
	label_Sonar           : '',
	label_SqueezeSensor   : '',
	label_VoltageOutput   : '',
}

WarningDisconnectedReport.propTypes = {
	nodeType              : PropTypes.string,
	messageTemplate       : PropTypes.string,
	label_AnalogSensor    : PropTypes.string,
	label_Buzzer          : PropTypes.string,
	label_CircuitTouch    : PropTypes.string,
	label_ContinuousServo : PropTypes.string,
	label_DigitalSensor   : PropTypes.string,
	label_DualColorLed    : PropTypes.string,
	label_Led             : PropTypes.string,
	label_LightSensor     : PropTypes.string,
	label_ServoMotor      : PropTypes.string,
	label_Sonar           : PropTypes.string,
	label_SqueezeSensor   : PropTypes.string,
	label_VoltageOutput   : PropTypes.string,
}

export default WarningDisconnectedReport
/* eslint-enable camelcase */

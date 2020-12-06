import { createStructuredSelector } from 'reselect'
import makeStringSelector from 'src/selectors/makeStringSelector'

const mapStateToProps = () => createStructuredSelector({
	messageTemplate       : makeStringSelector('simulator.warning.disconnected'),
	label_AnalogSensor    : makeStringSelector('flow.node.analog-sensor'),
	label_Buzzer          : makeStringSelector('flow.node.buzzer'),
	label_CircuitTouch    : makeStringSelector('flow.node.makey-touch'),
	label_ContinuousServo : makeStringSelector('flow.node.continuous-servo'),
	label_DigitalSensor   : makeStringSelector('flow.node.digital-sensor'),
	label_DualColorLed    : makeStringSelector('flow.node.dual-color-led'),
	label_Led             : makeStringSelector('flow.node.led'),
	label_LightSensor     : makeStringSelector('flow.node.light-sensor'),
	label_ServoMotor      : makeStringSelector('flow.node.servo-motor'),
	label_Sonar           : makeStringSelector('flow.node.sonar'),
	label_SqueezeSensor   : makeStringSelector('flow.node.squeeze-sensor'),
	label_VoltageOutput   : makeStringSelector('flow.node.voltage-output'),
})

export default mapStateToProps

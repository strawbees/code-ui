import { createStructuredSelector } from 'reselect'
import makeStringSelector from 'src/selectors/makeStringSelector'

const mapStateToProps = () => createStructuredSelector({
	messageTemplate           : makeStringSelector('simulator.error.same-place'),
	label_PLACE_LEFT_LEG      : makeStringSelector('flow.constant.place-left-leg'),
	label_PLACE_RIGHT_LEG     : makeStringSelector('flow.constant.place-right-leg'),
	label_PLACE_LEFT_ARM      : makeStringSelector('flow.constant.place-left-arm'),
	label_PLACE_RIGHT_ARM     : makeStringSelector('flow.constant.place-right-arm'),
	label_PLACE_HORN          : makeStringSelector('flow.constant.place-horn'),
	label_PLACE_LEFT_EYE      : makeStringSelector('flow.constant.place-left-eye'),
	label_PLACE_RIGHT_EYE     : makeStringSelector('flow.constant.place-right-eye'),
	label_PLACE_LEFT_MOUTH    : makeStringSelector('flow.constant.place-left-mouth'),
	label_PLACE_RIGHT_MOUTH   : makeStringSelector('flow.constant.place-right-mouth'),
	label_PLACE_SERVO_MOTOR_1 : makeStringSelector('flow.constant.servo-motor-1'),
	label_PLACE_SERVO_MOTOR_2 : makeStringSelector('flow.constant.servo-motor-1'),
})

export default mapStateToProps

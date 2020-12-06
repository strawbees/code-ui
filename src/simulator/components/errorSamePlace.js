import PropTypes from 'prop-types'
import Figure from './figure'
import ErrorSvg from '../assets/images/general/error.svg'

import {
	DISCONNECTED,
	PLACE_LEFT_LEG,
	PLACE_RIGHT_LEG,
	PLACE_LEFT_ARM,
	PLACE_RIGHT_ARM,
	PLACE_HORN,
	PLACE_LEFT_EYE,
	PLACE_RIGHT_EYE,
	PLACE_LEFT_MOUTH,
	PLACE_RIGHT_MOUTH,
	PLACE_SERVO_MOTOR_1,
	PLACE_SERVO_MOTOR_2,
} from '../quirkbotArduinoLibrary/Quirkbot'

export const ErrorSamePlace = ({
	place,
}) => {
	switch (place) {
		case PLACE_LEFT_LEG:
		case PLACE_RIGHT_LEG:
		case PLACE_LEFT_ARM:
		case PLACE_RIGHT_ARM:
		case PLACE_HORN:
		case PLACE_LEFT_EYE:
		case PLACE_RIGHT_EYE:
		case PLACE_LEFT_MOUTH:
		case PLACE_RIGHT_MOUTH:
		case PLACE_SERVO_MOTOR_1:
		case PLACE_SERVO_MOTOR_2:
			break
		default:
			return null
	}
	let x = 0
	let y = 0
	switch (place) {
		case PLACE_HORN:
			x = 50
			y = -170
			break
		case PLACE_LEFT_LEG:
			x = 145
			y = 135
			break
		case PLACE_RIGHT_LEG:
			x = -145
			y = 135
			break
		case PLACE_LEFT_ARM:
			x = 160
			y = -90
			break
		case PLACE_RIGHT_ARM:
			x = -160
			y = -90
			break
		case PLACE_LEFT_EYE:
			x = 70
			y = -20
			break
		case PLACE_RIGHT_EYE:
			x = -72
			y = -20
			break
		case PLACE_LEFT_MOUTH:
			x = 50
			y = 35
			break
		case PLACE_RIGHT_MOUTH:
			x = -52
			y = 35
			break
		case PLACE_SERVO_MOTOR_1:
			x = 130
			y = 415
			break
		case PLACE_SERVO_MOTOR_2:
			x = -132
			y = 415
			break
		default:
	}

	return (
		<div className={`root errorSamePlace ${place} `}>
			<style jsx>{`
				.root {
					z-index: 1;
				}
			`}</style>
			<Figure
				svg={ErrorSvg}
				x={x}
				y={y}
			/>
		</div>
	)
}
ErrorSamePlace.defaultProps = {
	place : DISCONNECTED,
}

ErrorSamePlace.propTypes = {
	place : PropTypes.number,
}

export default ErrorSamePlace

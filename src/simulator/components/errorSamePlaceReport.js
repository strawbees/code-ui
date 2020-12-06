/* eslint-disable camelcase */
import { useState } from 'react'
import PropTypes from 'prop-types'
import S from 'src/containers/sManager'
import Markdown from 'src/components/markdown'
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

export const ErrorSamePlaceReport = ({
	place,
	label_PLACE_LEFT_LEG,
	label_PLACE_RIGHT_LEG,
	label_PLACE_LEFT_ARM,
	label_PLACE_RIGHT_ARM,
	label_PLACE_HORN,
	label_PLACE_LEFT_EYE,
	label_PLACE_RIGHT_EYE,
	label_PLACE_LEFT_MOUTH,
	label_PLACE_RIGHT_MOUTH,
	label_PLACE_SERVO_MOTOR_1,
	label_PLACE_SERVO_MOTOR_2,
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
	const placeLabels = new Map()
	placeLabels.set(PLACE_LEFT_LEG, label_PLACE_LEFT_LEG)
	placeLabels.set(PLACE_RIGHT_LEG, label_PLACE_RIGHT_LEG)
	placeLabels.set(PLACE_LEFT_ARM, label_PLACE_LEFT_ARM)
	placeLabels.set(PLACE_RIGHT_ARM, label_PLACE_RIGHT_ARM)
	placeLabels.set(PLACE_HORN, label_PLACE_HORN)
	placeLabels.set(PLACE_LEFT_EYE, label_PLACE_LEFT_EYE)
	placeLabels.set(PLACE_RIGHT_EYE, label_PLACE_RIGHT_EYE)
	placeLabels.set(PLACE_LEFT_MOUTH, label_PLACE_LEFT_MOUTH)
	placeLabels.set(PLACE_RIGHT_MOUTH, label_PLACE_RIGHT_MOUTH)
	placeLabels.set(PLACE_SERVO_MOTOR_1, label_PLACE_SERVO_MOTOR_1)
	placeLabels.set(PLACE_SERVO_MOTOR_2, label_PLACE_SERVO_MOTOR_2)
	const [messageTemplate, setMessageTemplate] = useState('')
	const message = messageTemplate.split('%1').join(placeLabels.get(place))
	return (
		<div className={`root errorSamePlaceReport ${place} `}>
			<style jsx>{`
				.root {
					position: relative;
					background-color: rgba(240, 60, 104, 0.3);
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
			<S value='simulator.error.same-place' onChange={setMessageTemplate} render={false}/>
			<Figure
				className='icon'
				svg={ErrorSvg}
				scale={0.6}
				x={0}
				y={0}
			/>
			<Markdown className='message' source={message}/>
		</div>
	)
}
ErrorSamePlaceReport.defaultProps = {
	place                     : DISCONNECTED,
	messageTemplate           : '',
	label_PLACE_LEFT_LEG      : '',
	label_PLACE_RIGHT_LEG     : '',
	label_PLACE_LEFT_ARM      : '',
	label_PLACE_RIGHT_ARM     : '',
	label_PLACE_HORN          : '',
	label_PLACE_LEFT_EYE      : '',
	label_PLACE_RIGHT_EYE     : '',
	label_PLACE_LEFT_MOUTH    : '',
	label_PLACE_RIGHT_MOUTH   : '',
	label_PLACE_SERVO_MOTOR_1 : '',
	label_PLACE_SERVO_MOTOR_2 : '',
}

ErrorSamePlaceReport.propTypes = {
	place                     : PropTypes.number,
	messageTemplate           : PropTypes.string,
	label_PLACE_LEFT_LEG      : PropTypes.string,
	label_PLACE_RIGHT_LEG     : PropTypes.string,
	label_PLACE_LEFT_ARM      : PropTypes.string,
	label_PLACE_RIGHT_ARM     : PropTypes.string,
	label_PLACE_HORN          : PropTypes.string,
	label_PLACE_LEFT_EYE      : PropTypes.string,
	label_PLACE_RIGHT_EYE     : PropTypes.string,
	label_PLACE_LEFT_MOUTH    : PropTypes.string,
	label_PLACE_RIGHT_MOUTH   : PropTypes.string,
	label_PLACE_SERVO_MOTOR_1 : PropTypes.string,
	label_PLACE_SERVO_MOTOR_2 : PropTypes.string,
}

export default ErrorSamePlaceReport
/* eslint-enable camelcase */

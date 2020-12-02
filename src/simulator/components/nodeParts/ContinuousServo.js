import PropTypes from 'prop-types'
import { useRef, useState } from 'react'
import Figure from '../figure'
import useAnimationFrame from '../../utils/useAnimationFrame'
import ServoBodySVG from '../../assets/images/node-parts/servo-body.svg'
import ServoArmSingleSVG from '../../assets/images/node-parts/servo-arm-single.svg'
import ServoCable1SVG from '../../assets/images/node-parts/servo-cable-1.svg'
import ServoCable2SVG from '../../assets/images/node-parts/servo-cable-2.svg'

import {
	DISCONNECTED,
	PLACE_SERVO_MOTOR_1,
	PLACE_SERVO_MOTOR_2,
	DIRECTION_COUNTER_CLOCKWISE,
	DIRECTION_CLOCKWISE,
} from '../../quirkbotArduinoLibrary/Quirkbot'

export const ContinuousServo = ({
	place,
	speed,
	direction,
}) => {
	switch (place) {
		case PLACE_SERVO_MOTOR_1:
		case PLACE_SERVO_MOTOR_2:
			break
		default:
			return null
	}
	let x = 195
	const y = 450
	let cableX = 0
	let cableY = 0
	let armX = 0
	let armY = 0

	const armWidth = 74
	const armHeight = 226
	switch (place) {
		case PLACE_SERVO_MOTOR_1:
			cableX = x - 42
			cableY = y - 200
			break
		case PLACE_SERVO_MOTOR_2:
			x = -x
			cableX = x + 113
			cableY = y - 200
			break
		default:
	}
	armX = x - 36
	armY = y - 223

	const speedRef = useRef(0)
	speedRef.current = speed
	const directionRef = useRef(0)
	directionRef.current = direction
	const armAngleRef = useRef(0)
	const [armAngle, setArmAngle] = useState(armAngleRef.current)
	useAnimationFrame((dt) => {
		const turnSpeed = 0.2 * speedRef.current
		if (directionRef.current === DIRECTION_CLOCKWISE) {
			armAngleRef.current += dt * turnSpeed
		} else if (directionRef.current === DIRECTION_COUNTER_CLOCKWISE) {
			armAngleRef.current -= dt * turnSpeed
		}
		setArmAngle(armAngleRef.current)
	})

	return (
		<div className={`root nodePart ContinuousServo ${place}`}>
			<style jsx>{`
				.root {
					z-index:0;
				}
				.root .arm {
					pointer-events: none;
					width: ${armWidth}px;
					height: ${armHeight}px;
					transform-origin: ${armWidth * 0.5}px ${armHeight - 36}px;
					transform: translate3d(${armX}px, ${armY}px, 0) rotate(${armAngle}deg);
				}
			`}</style>
			{(place === PLACE_SERVO_MOTOR_1 || place === PLACE_SERVO_MOTOR_2) &&
				<Figure
					svg={place === PLACE_SERVO_MOTOR_1 ? ServoCable1SVG : ServoCable2SVG}
					x={cableX}
					y={cableY}
					scale={2}
				/>
			}
			<Figure
				svg={ServoBodySVG}
				x={x}
				y={y}
			/>
			<div className='arm'>
				<Figure
					svg={ServoArmSingleSVG}
					x={armWidth * 0.5}
					y={115}
				/>
			</div>
		</div>
	)
}
ContinuousServo.defaultProps = {
	place     : DISCONNECTED,
	speed     : 0,
	direction : 0,
}

ContinuousServo.propTypes = {
	place     : PropTypes.number,
	speed     : PropTypes.number,
	direction : PropTypes.number,
}

export default ContinuousServo

import PropTypes from 'prop-types'
import { useRef, useState, useEffect } from 'react'
import Figure from '../figure'
import ServoBodySVG from '../../assets/images/node-parts/servo-body.svg'
import ServoArmSingleSVG from '../../assets/images/node-parts/servo-arm-single.svg'
import ServoCable1SVG from '../../assets/images/node-parts/servo-cable-1.svg'
import ServoCable2SVG from '../../assets/images/node-parts/servo-cable-2.svg'

import {
	DISCONNECTED,
	PLACE_SERVO_MOTOR_1,
	PLACE_SERVO_MOTOR_2,
} from '../../quirkbotArduinoLibrary/Quirkbot'

const useAnimationFrame = callback => {
	// Use useRef for mutable variables that we want to persist
	// without triggering a re-render on their change
	const requestRef = useRef()
	const previousTimeRef = useRef()

	const animate = time => {
		if (previousTimeRef.current !== undefined) {
			const deltaTime = time - previousTimeRef.current
			callback(deltaTime)
		}
		previousTimeRef.current = time
		requestRef.current = requestAnimationFrame(animate)
	}

	useEffect(() => {
		requestRef.current = requestAnimationFrame(animate)
		return () => cancelAnimationFrame(requestRef.current)
	}, []) // Make sure the effect runs only once
}

export const ServoMotor = ({
	place,
	position,
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
	let armAgle = 0
	let cableX = 0
	let cableY = 0
	let armX = 0
	let armY = 0

	const armWidth = 74
	const armHeight = 226
	const armMaxAngle = 120
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
	armAgle = position * armMaxAngle - 90 + (180 - armMaxAngle) * 0.5

	const armAngleRef = useRef(armAgle)
	armAngleRef.current = armAgle
	const armRealAngleRef = useRef(0)
	const [armRealAngle, setArmRealAngle] = useState(armRealAngleRef.current)

	useAnimationFrame((dt) => {
		if (armRealAngleRef.current === armAngleRef.current) {
			return
		}
		const speed = 0.2
		let a = armRealAngleRef.current
		if (armRealAngleRef.current < armAngleRef.current) {
			a += dt * speed
			if (a > armAngleRef.current) {
				a = armAngleRef.current
			}
		} else {
			a -= dt * speed
			if (a < armAngleRef.current) {
				a = armAngleRef.current
			}
		}
		armRealAngleRef.current = a
		setArmRealAngle(armRealAngleRef.current)
	})

	return (
		<div className={`root nodePart ServoMotor ${place}`}>
			<style jsx>{`
				.root {
					z-index:0;
				}
				.root .arm {
					pointer-events: none;
					width: ${armWidth}px;
					height: ${armHeight}px;
					transform-origin: ${armWidth * 0.5}px ${armHeight - 36}px;
					transform: translate3d(${armX}px, ${armY}px, 0) rotate(${armRealAngle}deg);
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
ServoMotor.defaultProps = {
	place    : DISCONNECTED,
	position : 0,
}

ServoMotor.propTypes = {
	place    : PropTypes.number,
	position : PropTypes.number,
}

export default ServoMotor

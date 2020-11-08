import PropTypes from 'prop-types'
import Figure from '../figure'
import Range from './LightSensorRange'
import LightSensorSVG from '../../assets/images/node-parts/light-sensor.svg'

import {
	DISCONNECTED,
	PLACE_LEFT_LEG,
	PLACE_RIGHT_LEG,
	PLACE_LEFT_ARM,
	PLACE_RIGHT_ARM,
	PLACE_HORN,
} from '../../quirkbotArduinoLibrary/Quirkbot'

export const LightSensor = ({
	place,
	out,
	setData,
}) => {
	switch (place) {
		case PLACE_LEFT_LEG:
		case PLACE_RIGHT_LEG:
		case PLACE_LEFT_ARM:
		case PLACE_RIGHT_ARM:
		case PLACE_HORN:
			break
		default:
			return null
	}
	let componentX = 0
	let componentY = 0
	let componentAngle = 0
	let rangeX = 0
	let rangeY = 0
	switch (place) {
		case PLACE_HORN:
			componentX = -2
			componentY = -173
			rangeX = componentX - 40
			rangeY = componentY - 85
			componentAngle = 0
			break
		case PLACE_LEFT_LEG:
			componentX = 109
			componentY = 163
			componentAngle = 144
			rangeX = componentX + 40
			rangeY = componentY - 10
			break
		case PLACE_RIGHT_LEG:
			componentX = -109
			componentY = 164
			componentAngle = -144
			rangeX = componentX - 120
			rangeY = componentY - 10
			break
		case PLACE_LEFT_ARM:
			componentX = 176
			componentY = -45
			componentAngle = 72
			rangeX = componentX
			rangeY = componentY - 64
			break
		case PLACE_RIGHT_ARM:
			componentX = -178
			componentY = -42
			componentAngle = -72
			rangeX = componentX - 80
			rangeY = componentY - 64
			break
		default:
	}

	return (
		<div className={`root nodePart LightSensor ${place}`}>
			<style jsx>{`
				.root {
					z-index:1;
				}
				.root :global(> .LightSensorRange){
					position: absolute;
					transform: translate3d(${rangeX}px, ${rangeY}px, 0px);
				}
			`}</style>
			<Figure
				svg={LightSensorSVG}
				x={componentX}
				y={componentY}
				angle={componentAngle}
			/>
			<Range color={'red'}
				onChange={(value) => setData({ value : Number.parseFloat(value) })}
				value={out}
			/>
		</div>
	)
}
LightSensor.defaultProps = {
	place : DISCONNECTED,
	out   : 0,
}

LightSensor.propTypes = {
	place   : PropTypes.number,
	out     : PropTypes.number,
	setData : PropTypes.func,
}

export default LightSensor

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
} from '../../lib/quirkbot'

export const LightSensor = ({
	place,
	out,
	setData,
	adjustScale,
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
			rangeX = componentX + 50
			rangeY = componentY - 10
			break
		case PLACE_RIGHT_LEG:
			componentX = -109
			componentY = 164
			componentAngle = -144
			rangeX = componentX - 110
			rangeY = componentY - 10
			break
		case PLACE_LEFT_ARM:
			componentX = 176
			componentY = -45
			componentAngle = 72
			rangeX = componentX
			rangeY = componentY - 74
			break
		case PLACE_RIGHT_ARM:
			componentX = -178
			componentY = -42
			componentAngle = -72
			rangeX = componentX - 60
			rangeY = componentY - 74
			break
		default:
	}
	const scale = (1 / adjustScale) * 0.70
	return (
		<div className={`root nodePart LightSensor ${place}`}>
			<style jsx>{`
				.root {
					z-index:1;
				}
				.root :global(> .LightSensorRange){
					position: absolute;
					transform: translate3d(${rangeX}px, ${rangeY}px, 0px) scale(${scale});
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
	place       : DISCONNECTED,
	out         : 0,
	adjustScale : 1,
}

LightSensor.propTypes = {
	place       : PropTypes.number,
	out         : PropTypes.number,
	adjustScale : PropTypes.number,
	setData     : PropTypes.func,
}

export default LightSensor

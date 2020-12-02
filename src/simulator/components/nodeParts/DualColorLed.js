import PropTypes from 'prop-types'
import Figure from '../figure'
import LedSVG from '../../assets/images/node-parts/led.svg'
import ShineLedRedSVG from '../../assets/images/node-parts/shine-led-red.svg'
import ShineLedBlueSVG from '../../assets/images/node-parts/shine-led-blue.svg'

import {
	DISCONNECTED,
	PLACE_LEFT_LEG,
	PLACE_RIGHT_LEG,
	PLACE_LEFT_ARM,
	PLACE_RIGHT_ARM,
	PLACE_HORN,
} from '../../quirkbotArduinoLibrary/Quirkbot'

export const DualColorLed = ({
	place,
	light,
	color,
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
	let componentLightX = 0
	let componentLightY = 0
	switch (place) {
		case PLACE_HORN:
			componentX = 0
			componentY = -183
			componentLightX = componentX
			componentLightY = componentY - 40
			componentAngle = 0
			break
		case PLACE_LEFT_LEG:
			componentX = 112
			componentY = 172
			componentAngle = 144
			componentLightX = componentX + 24
			componentLightY = componentY + 34
			break
		case PLACE_RIGHT_LEG:
			componentX = -118
			componentY = 171
			componentAngle = -144
			componentLightX = componentX - 24
			componentLightY = componentY + 34
			break
		case PLACE_LEFT_ARM:
			componentX = 186
			componentY = -46
			componentAngle = 72
			componentLightX = componentX + 36
			componentLightY = componentY - 13
			break
		case PLACE_RIGHT_ARM:
			componentX = -186
			componentY = -46
			componentAngle = -72
			componentLightX = componentX - 36
			componentLightY = componentY - 13
			break
		default:
	}

	return (
		<div className={`root nodePart DualColorLed ${place}`}>
			<style jsx>{`
				.root {
					z-index:1;
				}
				.root :global(.light) {
					mix-blend-mode: hard-light;
				}
			`}</style>
			<Figure
				svg={LedSVG}
				x={componentX}
				y={componentY}
				angle={componentAngle}
			/>
			<Figure
				svg={ShineLedRedSVG}
				x={componentLightX}
				y={componentLightY}
				scale={light}
				opacity={1 - color}
				className='light'
			/>
			<Figure
				svg={ShineLedBlueSVG}
				x={componentLightX}
				y={componentLightY}
				scale={light}
				opacity={color}
				className='light'
			/>
		</div>
	)
}
DualColorLed.defaultProps = {
	place : DISCONNECTED,
	light : 0,
	color : 0,
}

DualColorLed.propTypes = {
	place : PropTypes.number,
	light : PropTypes.number,
	color : PropTypes.number,
}

export default DualColorLed

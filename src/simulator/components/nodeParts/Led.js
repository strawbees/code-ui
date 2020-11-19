import PropTypes from 'prop-types'
import Figure from '../figure'
import LedSVG from '../../assets/images/node-parts/led.svg'
import ShineLedRedSVG from '../../assets/images/node-parts/shine-led-red.svg'
import ShineLedBuiltinEyeSVG from '../../assets/images/node-parts/shine-led-builtin-eye.svg'
import ShineLedBuiltinMouthSVG from '../../assets/images/node-parts/shine-led-builtin-mouth.svg'

import {
	DISCONNECTED,
	PLACE_LEFT_MOUTH,
	PLACE_RIGHT_MOUTH,
	PLACE_LEFT_EYE,
	PLACE_RIGHT_EYE,
	PLACE_LEFT_LEG,
	PLACE_RIGHT_LEG,
	PLACE_LEFT_ARM,
	PLACE_RIGHT_ARM,
	PLACE_HORN,
} from '../../quirkbotArduinoLibrary/Quirkbot'

export const Led = ({
	place,
	light
}) => {
	switch (place) {
		case PLACE_LEFT_MOUTH:
		case PLACE_RIGHT_MOUTH:
		case PLACE_LEFT_EYE:
		case PLACE_RIGHT_EYE:
		case PLACE_LEFT_LEG:
		case PLACE_RIGHT_LEG:
		case PLACE_LEFT_ARM:
		case PLACE_RIGHT_ARM:
		case PLACE_HORN:
			break
		default:
			return null
	}
	let showComponent = false
	let showMouth = false
	let showEye = false
	let componentX = 0
	let componentY = 0
	let componentAngle = 0
	let componentLightX = 0
	let componentLightY = 0
	let mouthX = 0
	let mouthY = 0
	let eyeX = 0
	let eyeY = 0
	switch (place) {
		case PLACE_HORN:
			showComponent = true
			componentX = 0
			componentY = -183
			componentLightX = componentX
			componentLightY = componentY - 40
			componentAngle = 0
			break
		case PLACE_LEFT_LEG:
			showComponent = true
			componentX = 112
			componentY = 172
			componentAngle = 144
			componentLightX = componentX + 24
			componentLightY = componentY + 34
			break
		case PLACE_RIGHT_LEG:
			showComponent = true
			componentX = -118
			componentY = 171
			componentAngle = -144
			componentLightX = componentX - 24
			componentLightY = componentY + 34
			break
		case PLACE_LEFT_ARM:
			showComponent = true
			componentX = 186
			componentY = -46
			componentAngle = 72
			componentLightX = componentX + 36
			componentLightY = componentY - 13
			break
		case PLACE_RIGHT_ARM:
			showComponent = true
			componentX = -186
			componentY = -46
			componentAngle = -72
			componentLightX = componentX - 36
			componentLightY = componentY - 13
			break
		case PLACE_LEFT_EYE:
			showEye = true
			eyeX = 44
			eyeY = -35
			break
		case PLACE_RIGHT_EYE:
			showEye = true
			eyeX = -46
			eyeY = -35
			break
		case PLACE_LEFT_MOUTH:
			showMouth = true
			mouthX = 20
			mouthY = 50
			break
		case PLACE_RIGHT_MOUTH:
			showMouth = true
			mouthX = -23
			mouthY = 50
			break
		default:
	}

	return (
		<div className={`root nodePart Led ${place}`}>
			<style jsx>{`
				.root {
					z-index:1;
					mix-blend-mode: hard-light;
				}
				.root :global(.light) {
					mix-blend-mode: hard-light;
				}
			`}</style>
			{showComponent &&
				<Figure
					svg={LedSVG}
					x={componentX}
					y={componentY}
					angle={componentAngle}
				/>
			}
			{showComponent &&
				<Figure
					svg={ShineLedRedSVG}
					x={componentLightX}
					y={componentLightY}
					scale={light}
					className='light'
				/>
			}
			{showEye &&
				<Figure
					svg={ShineLedBuiltinEyeSVG}
					x={eyeX}
					y={eyeY}
					scale={light}
					className='light'
				/>
			}
			{showMouth &&
				<Figure
					svg={ShineLedBuiltinMouthSVG}
					x={mouthX}
					y={mouthY}
					scale={light}
					className='light'
				/>
			}
		</div>
	)
}
Led.defaultProps = {
	place : DISCONNECTED,
	light : 0,
}

Led.propTypes = {
	place : PropTypes.number,
	light : PropTypes.number,
}

export default Led

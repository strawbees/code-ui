import PropTypes from 'prop-types'
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
} from '../../quirkbotArduinoLibrary/core/constants'

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
	let color
	switch (place) {
		case PLACE_LEFT_MOUTH:
		case PLACE_RIGHT_MOUTH:
			color = 'green'
			break
		case PLACE_LEFT_EYE:
		case PLACE_RIGHT_EYE:
			color = 'blue'
			break
		case PLACE_LEFT_LEG:
		case PLACE_RIGHT_LEG:
		case PLACE_LEFT_ARM:
		case PLACE_RIGHT_ARM:
		case PLACE_HORN:
			color = 'white'
			break
		default:
			return null
	}
	return (
		<div className='root node-part Led'>
			<style jsx>{`
				.root {
					background-color: ${color};
					width: 20px;
					heigth: 20px;
					border-radius: 20px;
					transform: scale(${0.2 + 0.8 * light})
				}
			`}</style>
			Led
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

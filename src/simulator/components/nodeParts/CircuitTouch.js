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

export const CircuitTouch = ({
	place,
	out
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
	return (
		<div className='root node-part CircuitTouch'>
			<style jsx>{`
				.root {
				}
			`}</style>
			CircuitTouch
		</div>
	)
}
CircuitTouch.defaultProps = {
	place : DISCONNECTED,
	out   : 0,
}

CircuitTouch.propTypes = {
	place : PropTypes.number,
	out   : PropTypes.number,
}

export default CircuitTouch

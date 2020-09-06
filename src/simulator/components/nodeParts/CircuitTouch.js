import PropTypes from 'prop-types'
import {
	DISCONNECTED,
	PLACE_LEFT_LEG,
	PLACE_RIGHT_LEG,
	PLACE_LEFT_ARM,
	PLACE_RIGHT_ARM,
	PLACE_HORN,
} from '../../quirkbotArduinoLibrary/core/constants'

export const CircuitTouch = ({
	place,
	out,
	setData,
}) => {
	const activate = () => setData({ value : 1 })
	const deactivate = () => setData({ value : 0 })
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
					background-color: ${out === 1 ? 'yellow' : 'transparent'}
				}
			`}</style>
			<button
				onMouseDown={activate}
				onTouchStart={activate}
				onMouseUp={deactivate}
				onTouchEnd={deactivate}>
				CircuitTouch
			</button>

		</div>
	)
}
CircuitTouch.defaultProps = {
	place : DISCONNECTED,
	out   : 0,
}

CircuitTouch.propTypes = {
	place   : PropTypes.number,
	out     : PropTypes.number,
	setData : PropTypes.func,
}

export default CircuitTouch

import PropTypes from 'prop-types'
import Figure from './figure'
import LedSVG from '../assets/images/node-parts/led.svg'
import ShineLedRedSVG from '../assets/images/node-parts/shine-led-red.svg'
import ShineLedBlueSVG from '../assets/images/node-parts/shine-led-blue.svg'

import {
	DISCONNECTED,
	PLACE_LEFT_LEG,
	PLACE_RIGHT_LEG,
	PLACE_LEFT_ARM,
	PLACE_RIGHT_ARM,
	PLACE_HORN,
} from '../lib/quirkbot'

export const PlotterNode = ({
	nodeType,
	out,
	min,
	max,
}) => {
	return (
		<div className={`root plotterNode ${nodeType}`}>
			<style jsx>{`
				.root {
				}
			`}</style>
			{nodeType}
		</div>
	)
}
PlotterNode.defaultProps = {
	out : 0,
	min : 0,
	max : 0,
}

PlotterNode.propTypes = {
	nodeType : PropTypes.string,
	out      : PropTypes.number,
	min      : PropTypes.number,
	max      : PropTypes.number,
}

export default PlotterNode

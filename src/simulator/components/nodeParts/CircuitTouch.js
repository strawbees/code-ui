import PropTypes from 'prop-types'
import Figure from '../figure'
import FrontPadSVG from '../../assets/images/node-parts/front-pad.svg'
import FrontPadActiveSVG from '../../assets/images/node-parts/front-pad-active.svg'

import {
	DISCONNECTED,
	PLACE_LEFT_LEG,
	PLACE_RIGHT_LEG,
	PLACE_LEFT_ARM,
	PLACE_RIGHT_ARM,
	PLACE_HORN,
} from '../../quirkbotArduinoLibrary/Quirkbot'

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
	let x = 0
	let y = 0
	let angle = 0
	let touchX = 0
	let touchY = 0
	switch (place) {
		case PLACE_HORN:
			x = -1
			y = -125
			touchX = -9
			touchY = -135
			angle = 0
			break
		case PLACE_LEFT_LEG:
			x = 80
			y = 125
			angle = 144
			touchX = 74
			touchY = 120
			break
		case PLACE_RIGHT_LEG:
			x = -82
			y = 125
			angle = -144
			touchX = -92
			touchY = 120
			break
		case PLACE_LEFT_ARM:
			x = 129
			y = -30
			angle = 72
			touchX = 124
			touchY = -38
			break
		case PLACE_RIGHT_ARM:
			x = -132
			y = -29
			angle = -72
			touchX = -142
			touchY = -38
			break
		default:
	}

	return (
		<div className={`root nodePart CircuitTouch ${place} ${out === 1 ? 'active' : ''}`}>
			<style jsx>{`
				.root {
					position: relative;
				}
				.root :global(>*) {
					position: absolute;
				}
				.root :global(.pad) {
					cursor: pointer;
					opacity: 1;
				}
				.root.active :global(.pad) {
					cursor: pointer;
					opacity: 0;
				}
				.root :global(.pad-activated) {
					opacity: 0;
					pointer-events: none;
				}
				.root.active :global(.pad-activated) {
					opacity: 1;
				}
				.indicator {
					pointer-events: none;
				}
				.indicator .center {
					position: absolute;
					width: 15px;
					height: 15px;
					border-radius: 15px;
					background-color: rgb(16,98,150);
				}
				.indicator .radial-1,
				.indicator .radial-2 {
					position: absolute;
					width: 15px;
					height: 15px;
					border-radius: 20px;
					border: solid 1.5px rgb(16,98,150);
				}
				.indicator .radial-1 {
					animation: grow 3s linear infinite;
				}
				.indicator .radial-2 {
					animation: grow 3s 1.5s linear infinite;
				}
				.root:hover .indicator .center{
					background-color: #F06364;
				}
				.root:hover .indicator .radial-1,
				.root:hover .indicator .radial-2 {
					border-color: #F06364;
				}
				.root.active .indicator {
					display: none;
				}
				@keyframes grow {
					0% {
						opacity: 0.7;
						transform: scale(1);
					}
					100% {
						opacity: 0;
						transform: scale(6);
					}
				}

			`}</style>
			<Figure
				svg={FrontPadSVG}
				x={x}
				y={y}
				angle={angle}
				className='pad touch-area'
				onMouseDown={activate}
				onTouchStart={activate}
				onMouseUp={deactivate}
				onTouchEnd={deactivate}
			/>
			<Figure
				svg={FrontPadActiveSVG}
				x={x}
				y={y}
				angle={angle}
				className='pad-activated'
				onMouseDown={activate}
				onTouchStart={activate}
				onMouseUp={deactivate}
				onTouchEnd={deactivate}
			/>
			<div className='indicator'
				style={{
					transform : `translate3d(${touchX}px,${touchY}px,0px)`
				}}>
				<div className='center'/>
				<div className='radial-1'/>
				<div className='radial-2'/>
			</div>
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

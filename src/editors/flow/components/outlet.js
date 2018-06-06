import React from 'react'
import PropTypes from 'prop-types'
import tinycolor from 'tinycolor2'
import Draggable from 'react-draggable'
import { GRAY } from 'src/constants/colors'

class Outlet extends React.Component {
	constructor(props) {
		super(props)
		this.drag = React.createRef()
	}

	onDragStart = () => {
		this.drag.current.focus()
		this.startDragRect = this.drag.current.getBoundingClientRect()
		// cache the position of all the targets
		this.dragTargets = Array.from(document.querySelectorAll('.parameterHandle'))
			.filter(element => element.dataset &&
				element.dataset.id &&
				element.dataset.instanceId
			)
			.map(element => ({
				rect        : element.getBoundingClientRect(),
				parameterId : element.dataset.id,
				instanceId  : element.dataset.instanceId
			}))
	}
	getInstanceParameter = (x, y) => {
		const {
			left,
			top,
			width,
			height
		} = this.startDragRect

		// Current rectangle
		const rect = {
			top    : top + y,
			bottom : top + y + height,
			left   : left + x,
			right  : left + x + width,
		}
		return this.getInstanceParameterFromRectangle(rect)
	}
	getInstanceParameterFromRectangle = (r1) =>
		this.dragTargets.filter(({ rect : r2 }) =>
			!(r2.left > r1.right ||
			r2.right < r1.left ||
			r2.top > r1.bottom ||
			r2.bottom < r1.top)
		).pop()

	onDragMove = (e, { x, y }) => {
		const parameter = this.getInstanceParameter(x, y)
		if (this.lastHoveredParameter !== parameter) {
			this.lastHoveredParameter = parameter
			this.props.onHover(parameter)
		}
	}
	onDragStop = (e, { x, y }) => {
		const parameter = this.getInstanceParameter(x, y)
		if (parameter) {
			this.props.onConnect(parameter)
		}
		this.props.onHover(null)
		console.warn('TODO: deleting instance and disconnecting inputs')
	}

	render() {
		const {
			onDragStart,
			onDragMove,
			onDragStop,
		} = this
		const {
			name,
		} = this.props
		return (
			<div className='root outlet'>
				<style jsx>{`
					.root {
						display: flex;
						flex-direction: row;
						align-items: center;
					}
					.name {
						color: white;
						font-size: 0.75rem;
						margin-right: 0.5rem;
						-webkit-font-smoothing: subpixel-antialiased;
					}
					.outletHandle {
						background-color: white;
						border-top-left-radius: 1.25rem;
						border-bottom-left-radius: 1.25rem;
						height: 1.25rem;
						width: 1rem;
						position: relative;
					}
					.circle {
						width: 1.25rem;
						height: 1.25rem;
						border-radius: 1.25rem;
						background-color: ${tinycolor(GRAY).toRgbString()};
						position: absolute;
						right: -0.625rem;
						top: 0;
					}
					.outletHandle .drag{
						cursor: grab;
					}
					.outletHandle .drag:focus{
						outline: none;
					}

					.outletHandle .drag.react-draggable-dragging {
						cursor: grabbing;
					}
				`}</style>
				<div className='name'>
					{name}
				</div>
				<div className='outletHandle'>
					<div className='circle'></div>
					<Draggable
						onStart={onDragStart}
						onDrag={onDragMove}
						onStop={onDragStop}
						position={{ x : 0, y : 0 }}>
						<div className='circle drag'
							tabIndex='0'
							ref={this.drag}>
						</div>
					</Draggable>
				</div>
			</div>
		)
	}
}

Outlet.propTypes = {
	name      : PropTypes.string,
	onConnect : PropTypes.func,
	onHover   : PropTypes.func,
}

export default Outlet

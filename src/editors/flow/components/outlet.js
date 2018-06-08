import React from 'react'
import PropTypes from 'prop-types'
import tinycolor from 'tinycolor2'
import Draggable from 'react-draggable'
import {
	GRAY,
	YELLOW
} from 'src/constants/colors'

class Outlet extends React.Component {
	state = {
		dragging : false,
		position : { x : 0, y : 0 }
	}
	constructor(props) {
		super(props)
		this.drag = React.createRef()
	}
	componentDidMount() {
		this.props.setDragMethods({
			getDragRef  : () => this.drag,
			onDragStart : this.onDragStart,
			onDragMove  : this.onDragMove,
			onDragStop  : this.onDragStop,
		})
	}
	componentWillUnmount() {
		this.props.setDragMethods(null)
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
	onDragStart = (e, { x, y }) => {
		this.setState({
			dragging : true,
			position : { x, y }
		})
		this.props.onDragStart()
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
	onDragMove = (e, { x, y }) => {
		this.setState({
			position : { x, y }
		})
		const parameter = this.getInstanceParameter(x, y)
		if (this.lastHoveredParameter !== parameter) {
			this.lastHoveredParameter = parameter
			this.props.onHover(parameter)
		}
	}
	onDragStop = (e, { x, y }) => {
		this.setState({
			dragging : false,
			position : { x : 0, y : 0 }
		})
		this.props.onDragStop()
		const parameter = this.getInstanceParameter(x, y)
		if (parameter) {
			this.props.onConnect(parameter)
		}
		this.props.onHover(null)

		// important to return the parameter, in case the parameterHandle is
		// transfering the drag methods, and need to know if it was dropped
		// over itself
		return parameter
	}
	render() {
		const {
			onDragStart,
			onDragMove,
			onDragStop,
		} = this
		const {
			name,
			id,
			instanceId,
		} = this.props
		const {
			dragging,
			position
		} = this.state
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
						font-size: 0.8rem;
						margin-right: 0.25rem;
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
					.outletHandle .drag.dragging {
						cursor: grabbing;
						/*transition: background-color 0.5s;*/
						background-color: ${tinycolor(YELLOW).toRgbString()};
					}
				`}</style>
				<div className='name'>
					{name}
				</div>
				<div className='outletHandle'>
					<div className='circle'
						/* the id s needed for the ConnectionLines */
						id={`${instanceId}.${id}`}>
					</div>
					<Draggable
						onStart={onDragStart}
						onDrag={onDragMove}
						onStop={onDragStop}
						position={position}>
						<div className={`circle drag ${dragging ? 'dragging' : ''}`}
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
	id             : PropTypes.string,
	instanceId     : PropTypes.string,
	name           : PropTypes.string,
	onDragStart    : PropTypes.func,
	onDragStop     : PropTypes.func,
	onConnect      : PropTypes.func,
	onHover        : PropTypes.func,
	setDragMethods : PropTypes.func,
}

export default Outlet

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Draggable from 'react-draggable'
import CloseButton from 'src/editors/flow/components/closeButton'
import InstanceContainer from 'src/editors/flow/containers/instanceContainer'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

let ZINDEX = 0

class InstanceDraggableContainer extends React.Component {
	state = {
		style : {}
	}
	constructor(props) {
		super(props)
		this.ref = React.createRef()
	}
	bumpZ = () => {
		if (this.state.style.zIndex !== ZINDEX) {
			this.setState({
				style : {
					zIndex : ++ZINDEX
				}
			})
		}
	}
	moveInstance = (x, y) => {
		if (this.dragStartPosition.x === x &&
			this.dragStartPosition.y === y) {
			return
		}
		const {
			id,
			updateInstancePosition
		} = this.props
		if (x < 16) {
			x = 16
		}
		if (y < 16) {
			y = 16
		}
		if (this.lastDragX === x && this.lastDragY === y) {
			return
		}
		this.lastDragX = x
		this.lastDragY = y
		updateInstancePosition({ id, x, y })
	}
	onDragStart = (e, { x, y }) => {
		// cache the start position
		this.dragStartPosition = {
			x,
			y
		}
		// bring the instance to the front
		this.bumpZ()
		// starting the drag won't give focus on touch devices, so we need to
		// force it here.
		this.ref.current.focus({ preventScroll : true })
	}
	onDragMove = (e, { x, y }) => {
		this.moveInstance(x, y)
	}
	onDragStop = (e, { x, y }) => {
		this.moveInstance(x, y)
	}
	onKeyUp = ({ keyCode }) => {
		const {
			id,
			updateInstancePosition
		} = this.props
		let {
			x,
			y,
		} = this.props
		switch (keyCode) {
			case 37: // left
				x -= 10
				break
			case 39: // right
				x += 10
				break
			case 38: // up
				y -= 10
				break
			case 40: // down
				y += 10
				break
			default:
				return
		}
		if (x < 16) {
			x = 16
		}
		if (y < 16) {
			y = 16
		}
		updateInstancePosition({ id, x, y })
	}
	cancelEvent = (e) => {
		e.preventDefault()
	}
	onCloseClick = () => {
		const {
			id,
			removeInstance
		} = this.props
		removeInstance(id)
	}
	componentDidMount() {
		this.ref.current.focus({ preventScroll : true })
	}
	render() {
		const {
			onDragStart,
			onDragMove,
			onDragStop,
			onKeyUp,
			cancelEvent,
			onCloseClick,
		} = this
		const { style } = this.state
		const {
			x,
			y,
			id,
		} = this.props
		return (
			<Draggable
				cancel='.button-container,.instanceName,.parameterHandle,.outletHandle'
				onStart={onDragStart}
				onDrag={onDragMove}
				onStop={onDragStop}
				enableUserSelectHack={false}
				bounds={{ left : 16, top : 16 }}
				position={{ x, y }}>
				<div className='root instanceDraggableContainer'
					style={style}
					tabIndex='0'
					onKeyUp={onKeyUp}
					onTouchStart={cancelEvent}
					onTouchMove={cancelEvent}
					ref={this.ref}>
					<style jsx>{`
						.root {
							cursor: grab;
						}
						.root:focus {
							outline: none;
						}
						.root:focus,
						.root:focus-within {
							z-index: 99999 !important;
						}
						.root.react-draggable-dragging {
							cursor: grabbing;
						}

						.root .button-container {
							position: absolute;
							top: -0.5rem;
							right: -0.5rem;
							display: none;
						}
						.root:hover .button-container,
						.root:focus .button-container,
						.root:focus-within .button-container {
							display: block;
						}
					`}</style>
					<div className='button-container'>
						<CloseButton onClick={onCloseClick}/>
					</div>
					<InstanceContainer id={id}/>
				</div>
			</Draggable>
		)
	}
}

InstanceDraggableContainer.propTypes = {
	id                     : PropTypes.string,
	x                      : PropTypes.number,
	y                      : PropTypes.number,
	updateInstancePosition : PropTypes.func,
	removeInstance         : PropTypes.func,
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(InstanceDraggableContainer)

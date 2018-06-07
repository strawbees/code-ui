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
		if (x < 10) {
			x = 10
		}
		if (y < 10) {
			y = 10
		}
		updateInstancePosition({ id, x, y })
	}
	onMouseDown = () => {
		this.bumpZ()
	}
	onDragStart = (e, { x, y }) => {
		this.dragStartPosition = {
			x,
			y
		}
		this.ref.current.focus()
	}
	onDragMove = (e, { x, y }) => {
		// this.moveInstance(x, y)
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
		if (x < 10) {
			x = 10
		}
		if (y < 10) {
			y = 10
		}
		updateInstancePosition({ id, x, y })
	}
	onCloseClick = () => {
		const {
			id,
			removeInstance
		} = this.props
		removeInstance(id)
	}
	componentDidMount() {
		this.ref.current.focus()
	}

	render() {
		const {
			onMouseDown,
			onDragStart,
			onDragMove,
			onDragStop,
			onKeyUp,
			onCloseClick,
		} = this
		const { style } = this.state
		const {
			x,
			y,
			id
		} = this.props
		return (
			<Draggable
				cancel='.button-container,.instanceName,.parameterHandle,.outletHandle'
				onStart={onDragStart}
				onDrag={onDragMove}
				onStop={onDragStop}
				onMouseDown={onMouseDown}
				bounds={{ left : 10, top : 10 }}
				position={{ x, y }}>
				<div className='root instanceDraggableContainer'
					style={style}
					tabIndex='0'
					onKeyUp={onKeyUp}
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

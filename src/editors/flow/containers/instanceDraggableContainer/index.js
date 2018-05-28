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
	onDragStart = () => {
		this.setState({
			style : {
				zIndex : ++ZINDEX
			}
		})
	}
	onDragMove = (e, { x, y }) => {

	}
	onDragStop = (e, { x, y }) => {
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
	onKeyUp = ({ keyCode, ...e }) => {
		console.log(e)
		const {
			id,
			position,
			updateInstancePosition
		} = this.props
		let {
			x,
			y
		} = position
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
			onDragStart,
			onDragMove,
			onDragStop,
			onKeyUp,
			onCloseClick,
		} = this
		const { style } = this.state
		const {
			position,
			id
		} = this.props
		return (
			<Draggable
				cancel='.button-container,.instanceIdInput'
				onStart={onDragStart}
				onDrag={onDragMove}
				onStop={onDragStop}
				position={position}>
				<div className='root instanceDraggableContainer'
					style={style}
					tabIndex="0"
					ref={this.ref}>
					<style jsx>{`
						.root {
							cursor: grab;
						}
						.root:focus {
							outline: none;
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
						.root:hover .button-container {
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
	id       : PropTypes.string,
	position : PropTypes.shape({
		x : PropTypes.number,
		y : PropTypes.number,
	}),
	updateInstancePosition : PropTypes.func,
	removeInstance         : PropTypes.func,
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(InstanceDraggableContainer)

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Draggable from 'react-draggable'
import InstanceContainer from 'src/editors/flow/containers/instanceContainer'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

let ZINDEX = 0

class InstanceDraggableContainer extends React.Component {
	state = {
		style : {}
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
		updateInstancePosition({ id, x, y })
	}

	render() {
		const { style } = this.state
		const {
			position,
			id
		} = this.props
		return (
			<Draggable
				onStart={this.onDragStart}
				onDrag={this.onDragMove}
				onStop={this.onDragStop}
				position={position}>
				<div className='root instanceDraggableContainer'
					style={style}>
					<style jsx>{`
						.root {
							cursor: grab;
						}
						.root.react-draggable-dragging {
							cursor: grabbing;
						}
					`}</style>
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

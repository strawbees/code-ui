import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Draggable from 'react-draggable'
import NodeMini from 'src/editors/flow/components/nodeMini'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

class NodeMiniDraggableContainer extends React.Component {
	constructor(props) {
		super(props)
		this.draggable = React.createRef()
		this.state = {
			dragClass : 'drag-end',
			dragStyle : {}
		}
	}

	onDragStart = (e, ui) => {
		const bounding = ui.node.getBoundingClientRect()
		this.setState({
			dragStyle : {
				top  : bounding.y,
				left : bounding.x,
			},
			dragClass : 'drag-start'
		})
		// avoid scrolling on ios
		document.ontouchmove = (e) => e.preventDefault()
	}

	onDragMove = () => {
		if (this.state.dragClass !== 'drag-move') {
			this.setState({
				dragStyle : {
					top  : null,
					left : null,
				},
				dragClass : 'drag-move'
			})
		}
	}

	onDragStop = (e, { x, y }) => {
		const { getDropAreaRect } = this.props
		const {
			rect,
			scroll
		} = getDropAreaRect()

		if (x > rect.left &&
			x < rect.right &&
			y > rect.top &&
			y < rect.bottom) {
			const {
				id : nodeId,
				safeAddInstance
			} = this.props
			safeAddInstance({
				nodeId,
				x : (x - rect.left) + scroll.left,
				y : (y - rect.top) + scroll.top,
			})
		}

		this.setState({
			dragStyle : {
				top  : null,
				left : null,
			},
			dragClass : 'drag-end'
		})

		// restore scrolling on ios
		document.ontouchmove = () => true
	}

	render() {
		const {
			dragClass,
			dragStyle,
		} = this.state
		return (
			<div className='root nodeMiniDraggableContainer'>
				<style jsx>{`
					.root {
						position: relative;
					}
					.drag {
						opacity: 0;
						cursor: grab;
						position: absolute;
						top: 0;
						left: 0;
						width: 100%;
						cursor: grab;
					}

					.drag.drag-start,
					.drag.drag-move {
						opacity: 1;
						position: fixed;
						cursor: grabbing;
						width: 9.5rem;
						z-index: 10;
					}
					@media (max-width: 600px) {
						.drag.drag-start,
						.drag.drag-move {
							width: 2.4rem;
						}
					}
				`}</style>
				<NodeMini {...this.props}/>
				<Draggable
					onStart={this.onDragStart}
					onDrag={this.onDragMove}
					onStop={this.onDragStop}
					enableUserSelectHack={false}
					position={{ x : 0, y : 0 }}>
					<div
						className={`drag ${dragClass}`}
						ref={this.draggable}
						style={dragStyle}>
						<NodeMini {...this.props}/>
					</div>
				</Draggable>
			</div>
		)
	}
}

NodeMiniDraggableContainer.propTypes = {
	id              : PropTypes.string,
	getDropAreaRect : PropTypes.func,
	safeAddInstance : PropTypes.func,
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(NodeMiniDraggableContainer)

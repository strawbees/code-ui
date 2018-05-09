import React from 'react'
import { connect } from 'react-redux'
import Draggable, { DraggableCore } from 'react-draggable'
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
	onDragStop = () => {
		this.setState({
			dragStyle : {
				top  : null,
				left : null,
			},
			dragClass : 'drag-end'
		})
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
						width: 10rem;
						z-index: 2;
					}
				`}</style>
				<NodeMini {...this.props}/>
				<Draggable
					onStart={this.onDragStart}
					onDrag={this.onDragMove}
					onStop={this.onDragStop}
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

export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(NodeMiniDraggableContainer)

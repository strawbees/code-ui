import React from 'react'
import PropTypes from 'prop-types'
import InstanceDraggableContainer from 'src/editors/flow/containers/instanceDraggableContainer'

class Workspace extends React.Component {
	constructor(props) {
		super(props)
		this.dropArea = React.createRef()
		this.instancesArea = React.createRef()
	}
	componentDidMount() {
		const {
			registerGetDropAreaRect
		} = this.props
		registerGetDropAreaRect(
			() => ({
				rect   : this.dropArea.current.getBoundingClientRect(),
				scroll : {
					top  : this.instancesArea.current.scrollTop,
					left : this.instancesArea.current.scrollLeft
				}
			})
		)
	}
	render() {
		const { instanceIds } = this.props
		return (
			<div className='root workspace' ref={this.dropArea}>
				<style jsx>{`
					.root {
						background-color: white;
						position: relative;
					}
					.instances {
						position: absolute;
						top: 0;
						left: 0;
						right: 0;
						bottom: 0;
						overflow: scroll;
						display: flex;
						flex-direction: column;
						align-items: flex-start;
					}
					.instances :global(>*) {
						position: absolute;
						top:0;
						left: 0;
					}
				`}</style>
				<div className='instances' ref={this.instancesArea}>
					{instanceIds && instanceIds.map(id =>
						<InstanceDraggableContainer key={id} id={id} />
					)}
				</div>
			</div>
		)
	}
}

Workspace.propTypes = {
	registerGetDropAreaRect : PropTypes.func,
	instanceIds             : PropTypes.arrayOf(PropTypes.string),
}

export default Workspace

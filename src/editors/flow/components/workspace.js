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
	shouldComponentUpdate(nextProps) {
		const {
			instanceIds,
			registerGetDropAreaRect,
		} = this.props
		const {
			instanceIds             : nextInstanceIds,
			registerGetDropAreaRect : nextRegisterGetDropAreaRect
		} = nextProps

		if (registerGetDropAreaRect !== nextRegisterGetDropAreaRect) {
			return true
		}
		// the "instanceIds" may be different by reference, but if content is
		// the same (even if in different order) there is no need to re-render
		if (instanceIds.length !== nextInstanceIds.length) {
			return true
		}
		for (let i = 0; i < nextInstanceIds.length; i++) {
			const id = nextInstanceIds[i]
			if (instanceIds.indexOf(id) === -1) {
				return true
			}
		}
		return false
	}
	render() {
		console.log('workspace')
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
					{instanceIds && instanceIds.map((id, i) =>
						<InstanceDraggableContainer key={i} id={id} />
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

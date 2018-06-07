import React from 'react'
import PropTypes from 'prop-types'
import InstanceDraggableContainer from 'src/editors/flow/containers/instanceDraggableContainer'
import ConnectionLinesContainer from 'src/editors/flow/containers/connectionLinesContainer'

class Workspace extends React.Component {
	constructor(props) {
		super(props)
		this.ref = React.createRef()
		this.state = {
			linesStyle : {
				width  : '100%',
				height : '100%',
			}
		}
	}
	componentDidMount() {
		const {
			registerGetDropAreaRect,
		} = this.props
		registerGetDropAreaRect(
			() => ({
				rect   : this.ref.current.getBoundingClientRect(),
				scroll : {
					top  : this.ref.current.scrollTop,
					left : this.ref.current.scrollLeft,
				}
			})
		)
	}
	resizeLines = () => {
		this.setState({
			linesStyle : {
				width  : `calc(100% + ${this.ref.current.scrollLeft}px)`,
				height : `calc(100% + ${this.ref.current.scrollTop}px)`,
			}
		})
	}
	render() {
		const {
			ref,
			resizeLines,
		} = this
		const {
			linesStyle
		} = this.state
		const {
			instanceIds
		} = this.props
		return (
			<div className='root workspace'
				ref={ref}
				onScroll={resizeLines}>
				<style jsx>{`
					.root {
						background-color: white;
						user-select: none;
						display: flex;
						flex-direction: column;
						position: relative;
						overflow: scroll;
					}
					.lines {
						position: absolute;
						top: 0;
						left: 0;
						right: 0;
						bottom: 0;
						width: 100%;
						height: 100%;
					}
					.lines :global(>.connectionLines) {
						position: absolute;
						top: 0;
						left: 0;
						right: 0;
						bottom: 0;
						width: 100%;
						height: 100%;
					}
					.instances {
						position: relative;
						top: 0;
						left: 0;
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
				<div className='lines' style={linesStyle}>
					<ConnectionLinesContainer />
				</div>
				<div className='instances'>
					{instanceIds && instanceIds.map((id) =>
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

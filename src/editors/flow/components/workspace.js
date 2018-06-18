import React from 'react'
import PropTypes from 'prop-types'
import InstanceDraggableContainer from 'src/editors/flow/containers/instanceDraggableContainer'
import ConnectionLinesContainer from 'src/editors/flow/containers/connectionLinesContainer'

class Workspace extends React.Component {
	constructor(props) {
		super(props)
		this.selfRef = React.createRef()
	}
	componentDidMount() {
		const {
			registerGetDropAreaRect,
		} = this.props
		registerGetDropAreaRect(
			() => ({
				rect : this.selfRef.current &&
					this.selfRef.current.getBoundingClientRect(),
				scroll : {
					top : this.selfRef.current &&
						this.selfRef.current.scrollTop,
					left : this.selfRef.current &&
						this.selfRef.current.scrollLeft,
				}
			})
		)
	}
	onDown = (e) => {
		if (e.type === 'mousedown' && this.isTouch) {
			this.isTouch = false
			return
		}
		if (e.type === 'touchstart') {
			this.isTouch = true
		}
		if (e.type === 'mousedown') {
			this.startDragMove = {
				x : e.clientX,
				y : e.clientY,
			}
		} else if (e.type === 'touchstart') {
			this.startDragMove = {
				x : e.touches[0].clientX,
				y : e.touches[0].clientY,
			}
		}
		this.startDragOffset = {
			x : this.selfRef.current.scrollLeft,
			y : this.selfRef.current.scrollTop,
		}
		window.addEventListener('mousemove', this.onMove, { passive : false })
		window.addEventListener('mouseup', this.onUp)
		window.addEventListener('touchmove', this.onMove, { passive : false })
		window.addEventListener('touchend', this.onUp)
	}
	onMove = (e) => {
		e.preventDefault()
		const diff = { x : 0, y : 0 }
		if (e.type === 'mousemove') {
			diff.x = this.startDragMove.x - e.clientX
			diff.y = this.startDragMove.y - e.clientY
		} else if (e.type === 'touchmove') {
			diff.x = this.startDragMove.x - e.touches[0].clientX
			diff.y = this.startDragMove.y - e.touches[0].clientY
		}
		diff.x += this.startDragOffset.x
		diff.y += this.startDragOffset.y

		diff.x = diff.x < 0 ? 0 : diff.x
		diff.y = diff.y < 0 ? 0 : diff.y

		this.selfRef.current.scrollLeft = diff.x
		this.selfRef.current.scrollTop = diff.y
	}
	onUp = (e) => {
		this.startDragMove = null
		window.removeEventListener('mousemove', this.onMove)
		window.removeEventListener('mouseup', this.onUp)
		window.removeEventListener('touchmove', this.onMove)
		window.removeEventListener('touchend', this.onUp)
	}

	render() {
		const {
			selfRef,
			onDown,
		} = this
		const {
			instanceIds,
			width,
			height,
		} = this.props
		return (
			<div className='root workspace'
				ref={selfRef}>
				<style jsx>{`
					.root {
						background-color: transparent;
						user-select: none;
						display: flex;
						flex-direction: column;
						position: relative;
						overflow: auto;
						overscroll-behavior: none;
						touch-action: none;
					}
					.lines {
						position: absolute;
						top: 0;
						left: 0;
						min-width: 100%;
						min-height: 100%;
						background-size: 1rem 1rem;
						/* background-image: radial-gradient(circle, rgba(0,0,0,0.1) 1.5px, rgba(0, 0, 0, 0) 1px);*/
						background-image:
							linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px),
							linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px);
						overflow: hidden;
						touch-action: none;
					}
					.lines :global(>.connectionLines) {
						position: absolute;
						top: 0;
						left: 0;
						width: 100%;
						height: 100%;
						overflow: hidden;
					}
					.instances {
						position: relative;
						display: flex;
						flex-direction: column;
						align-items: flex-start;
					}
					.instances :global(>*) {
						position: absolute;
						top: 0;
						left: 0;
					}
				`}</style>
				<div className='lines'
					style={{ width, height }}
					onMouseDown={onDown}
					onTouchStart={onDown}
					tabIndex='0'
				>
					<ConnectionLinesContainer />
				</div>
				<div className='instances'>
					{instanceIds && instanceIds.map((id) =>
						<InstanceDraggableContainer
							key={id}
							id={id}
						/>
					)}
				</div>
			</div>
		)
	}
}

Workspace.propTypes = {
	registerGetDropAreaRect : PropTypes.func,
	instanceIds             : PropTypes.arrayOf(PropTypes.string),
	width                   : PropTypes.number,
	height                  : PropTypes.number,
}

export default Workspace

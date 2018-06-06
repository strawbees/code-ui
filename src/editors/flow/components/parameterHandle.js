import React from 'react'
import PropTypes from 'prop-types'
import tinycolor from 'tinycolor2'
import Draggable from 'react-draggable'
import ParameterDisplayValueContainer from 'src/editors/flow/containers/parameterDisplayValueContainer'
import ParameterControlContainer from 'src/editors/flow/containers/parameterControlContainer'
import {
	GRAY,
	YELLOW,
} from 'src/constants/colors'


class ParameterHandle extends React.Component {
	constructor(props) {
		super(props)
		this.outletDragRef = React.createRef()
	}
	cancelEvent = (e) => {
		e.preventDefault()
		e.stopPropagation()
	}
	focusInput = (e) => {
		// if the click is on the parameterHandle, focus on the first input inside
		if (e.target.className.indexOf('parameterHandle') !== -1) {
			const input = e.target.querySelector('.parameterControl input')
			if (input) {
				input.focus()
				input.select()
			}
		}
	}
	onDragStart = (e, data) => {
		// preventDefault on the event, so we don't focus the parameter handler
		e.preventDefault()

		const destRect = this.props.outletTransferDragMethods
			.getDragRef().current.getBoundingClientRect()
		const sourceRect = this.outletDragRef
			.current.getBoundingClientRect()
		this.outletDragDiff = {
			x : sourceRect.left - destRect.left,
			y : sourceRect.top - destRect.top,
		}
		data.x += this.outletDragDiff.x
		data.y += this.outletDragDiff.y
		this.props.outletTransferDragMethods.onDragStart(e, data)
	}
	onDragMove = (e, data) => {
		data.x += this.outletDragDiff.x
		data.y += this.outletDragDiff.y
		this.props.outletTransferDragMethods.onDragMove(e, data)
	}
	onDragStop = (e, data) => {
		data.x += this.outletDragDiff.x
		data.y += this.outletDragDiff.y
		this.props.outletTransferDragMethods.onDragStop(e, data)
	}
	render() {
		const {
			cancelEvent,
			focusInput,
			onDragStart,
			onDragMove,
			onDragStop
		} = this
		const {
			id,
			instanceId,
			connected,
			highlighted,
			recommeded,
		} = this.props

		return (
			/* Class "parameterHandle" necessary for drag-drop outlets */
			<div className={`root parameterHandle ${connected ? 'connected' : ''} ${highlighted ? 'highlighted' : ''} ${recommeded ? 'recommeded' : ''}`}
				tabIndex='0'
				onKeyUp={cancelEvent}
				onFocus={focusInput}
				/* Data ids necessary for drag-drop outlets */
				data-id={id}
				data-instance-id={instanceId}>
				<style jsx>{`
					.root {
						position: relative;
						display: flex;
						flex-direction: column;
						align-items: flex-start;
						margin-left: -0.625rem;
						padding-left: 0.625rem;
						box-sizing: border-box;
					}
					.root:focus {
						outline: none;
					}
					.value {
						display: flex;
						flex-direction: row;
						align-items: center;
						height: 1.25rem;
						position: relative;
					}
					.value .circle {
						width: 1.25rem;
						height: 1.25rem;
						border-radius: 1.25rem;
						background-color: ${tinycolor(GRAY).lighten(20).toRgbString()};
						position: absolute;
						top: 0;
						left: -0.625rem;
						cursor: pointer;
					}
					.value :global(> .parameterDisplayValue) {
						background-color: white;
						padding: 0 0.5rem 0 0.75rem;
						border-top-right-radius: 1rem;
						border-bottom-right-radius: 1rem;
						height: 1.25rem;
						cursor: pointer;
					}
					.control {
						display: none;
						z-index: 2;
					}
					.root:focus .control,
					.root:focus-within .control {
						display: block;
						position: absolute;
						animation-duration: 0.1s;
						animation-name: slide;
						animation-timing-function: ease-out;
						transform-origin: top center;
					}
					@keyframes slide {
						from {
							opacity: 0;
							transform: scale3d(1,0,1);
						}
						to {
							opacity: 1;
							transform: scale3d(1,1,1);
						}
					}
					.root.connected .value .circle {
						background-color: ${tinycolor(YELLOW).toRgbString()};
						cursor: grab;
					}
					.root.highlighted .value :global(> .parameterDisplayValue),
					.root.highlighted .value .circle {
						background-color: ${tinycolor(YELLOW).toRgbString()};
					}
					.root.recommeded:not(:focus):not(:focus-within) {
						border-radius: 1.25rem;
						box-shadow: 0 0 0 0.15rem ${tinycolor(YELLOW).toRgbString()};
						/*animation-duration: 0.5s;
						animation-name: glow;
						animation-timing-function: ease-out;
						animation-iteration-count: infinite;
						animation-direction: alternate;*/
					}
					@keyframes glow {
						from {
							box-shadow: 0 0 0 0 ${tinycolor(YELLOW).setAlpha(0).toRgbString()};
						}
						to {
							box-shadow: 0 0 0 0.15rem ${tinycolor(YELLOW).toRgbString()};
						}
					}
				`}</style>
				<div className='value'>
					<div className='circle'></div>
					{connected &&
						<Draggable
							onStart={onDragStart}
							onDrag={onDragMove}
							onStop={onDragStop}
							position={{ x : 0, y : 0 }}>
							<div className='circle'
								ref={this.outletDragRef}>
							</div>
						</Draggable>
					}
					<ParameterDisplayValueContainer id={id} instanceId={instanceId} />
				</div>
				<div className='control'>
					<ParameterControlContainer id={id} instanceId={instanceId} />
				</div>
			</div>
		)
	}
}


ParameterHandle.propTypes = {
	id                        : PropTypes.string,
	instanceId                : PropTypes.string,
	connected                 : PropTypes.bool,
	highlighted               : PropTypes.bool,
	recommeded                : PropTypes.bool,
	outletTransferDragMethods : PropTypes.shape({
		getDragRef  : PropTypes.func,
		onDragStart : PropTypes.func,
		onDragMove  : PropTypes.func,
		onDragStop  : PropTypes.func,
	})
}

export default ParameterHandle

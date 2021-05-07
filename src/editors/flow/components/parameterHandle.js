import React from 'react'
import PropTypes from 'prop-types'
import tinycolor from 'tinycolor2'
import Draggable from 'react-draggable'
import ParameterControlContainer from 'src/editors/flow/containers/parameterControlContainer'
import ParameterDisplayValueContainer from 'src/editors/flow/containers/parameterDisplayValueContainer'
import {
	GRAY,
	YELLOW,
	WHITE,
} from 'src/constants/colors'

class ParameterHandle extends React.Component {
	state = {
		disconnecting : false,
	}

	constructor(props) {
		super(props)
		this.selfRef = React.createRef()
		this.outletDragRef = React.createRef()
	}

	cancelEvent = (e) => {
		e.preventDefault()
		e.stopPropagation()
	}

	onFocus = (e) => {
		const { target } = e
		// if the click is on the parameterHandle, focus on the first input inside
		if (target.className.indexOf('parameterHandle') !== -1) {
			const input = target.querySelector('.parameterControl input[type=text]')
			if (input) {
				input.focus({ preventScroll : true })
				input.select()
			}
			setTimeout(() => {
				// use this hack to make it scroll the control into the view
				const control = target.querySelector('.parameterControl')
				if (control) {
					control.scrollIntoView({
						behavior : 'smooth',
						block    : 'nearest',
						inline   : 'nearest',
					})
				}
				setTimeout(() => {
					// use this hack to make it scroll the selected option into the view
					const option = target.querySelector('.parameterControl .parameterDisplayValueList .item.selected')
					if (option) {
						option.scrollIntoView({
							behavior : 'smooth',
							block    : 'nearest',
							inline   : 'nearest',
						})
					}
				}, 300)
			}, 300)
		}
	}

	onDragStart = (e, data) => {
		// preventDefault on the event, so we don't focus the parameter handler
		e.preventDefault()

		// anounce that the disconnect has started
		this.props.onDisconnectStart()
		this.setState({ disconnecting : true })

		// as we are trasnfering the drag from a element that is in a different
		// position, we need to calculate the diff, that will be applied to
		// all drag methods
		const destRect = this.props.outletTransferDragMethods
			.getDragRef().current.getBoundingClientRect()
		const sourceRect = this.outletDragRef
			.current.getBoundingClientRect()
		this.outletDragDiff = {
			x : sourceRect.left - destRect.left,
			y : sourceRect.top - destRect.top,
		}

		// apply diff and forward event
		data.x += this.outletDragDiff.x
		data.y += this.outletDragDiff.y
		this.props.outletTransferDragMethods.onDragStart(e, data)
	}

	onDragMove = (e, data) => {
		// apply diff and forward event
		data.x += this.outletDragDiff.x
		data.y += this.outletDragDiff.y
		this.props.outletTransferDragMethods.onDragMove(e, data)
	}

	onDragStop = (e, data) => {
		// apply diff and forward event
		data.x += this.outletDragDiff.x
		data.y += this.outletDragDiff.y

		// anounce that the disconnect has started
		this.props.onDisconnectStop()
		this.setState({ disconnecting : false })

		// store a reference to the possibly found parameter
		const parameter = this.props.outletTransferDragMethods.onDragStop(e, data)

		// "disconnect" the parameter, by setting an empty code value, but only
		// of if the new found paramenter it's not this parameter itself
		if (!parameter) {
			this.props.onValueCodeChange('')
			return
		}
		if (parameter.parameterId !== this.props.id ||
			parameter.instanceId !== this.props.instanceId
		) {
			this.props.onValueCodeChange('')
		}
	}

	render() {
		const {
			cancelEvent,
			onFocus,
			onDragStart,
			onDragMove,
			onDragStop,
			outletDragRef,
			selfRef,
		} = this
		const {
			disconnecting,
		} = this.state
		const {
			id,
			instanceId,
			connected,
			highlighted,
			recommeded,
		} = this.props

		let classes = connected ? 'connected ' : ''
		classes += highlighted ? 'highlighted ' : ''
		classes += recommeded ? 'recommeded ' : ''
		classes += disconnecting ? 'disconnecting ' : ''

		return (
			/* Class "parameterHandle" necessary for drag-drop outlets */
			<div className={`root parameterHandle ${classes}`}
				tabIndex='0'
				onKeyUp={cancelEvent}
				onFocus={onFocus}
				role='menubutton'
				aria-haspopup='true'
				ref={selfRef}
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
						background-color: ${tinycolor(WHITE).toRgbString()};
						padding: 0 0.5rem 0 0.75rem;
						border-top-right-radius: 1rem;
						border-bottom-right-radius: 1rem;
						height: 1.25rem;
						cursor: pointer;
					}
					.control {
						/* for some crazy reason, this NEEDS to be
						** visibility:hidden, and not display:none, otherwise
						** safary will have wierd bug that autoFocus on the
						** text field.
						**/
						visibility: hidden;
						opacity: 0;
						transform: scale3d(0,0,1);
						position: absolute;
						left: 1.65rem;
						top: -0.25rem;
						transform-origin: -0.6rem 0.8rem;
						z-index: 2;
						transition: opacity 0.1s ease-out, transform 0.1s ease-out;
					}
					.root:focus .control,
					.root:focus-within .control,
					.control:focus-within {
						visibility: visible;
						opacity: 1;
						transform: scale3d(1,1,1);
					}
					.root.connected:not(.disconnecting) .value .circle {
						background-color: ${tinycolor(YELLOW).toRgbString()};
						cursor: grab;
					}
					.circle.react-draggable-dragging {
						opacity: 0;
					}
					.root.highlighted .value :global(> .parameterDisplayValue),
					.root.highlighted .value .circle {
						background-color: ${tinycolor(YELLOW).toRgbString()};
					}
					.root.recommeded:not(:focus):not(:focus-within) {
						border-radius: 1.25rem;
						box-shadow: 0 0 0 0.15rem ${tinycolor(YELLOW).toRgbString()};
						animation-duration: 0.5s;
						animation-name: glow;
						animation-timing-function: ease-out;
						animation-iteration-count: infinite;
						animation-direction: alternate;
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
					<div className='circle'
						/* the id is needed for the ConnectionLines */
						id={`${instanceId}.${id}`}
					/>
					<Draggable
						onStart={onDragStart}
						onDrag={onDragMove}
						onStop={onDragStop}
						disabled={!connected}
						enableUserSelectHack={false}
						position={{ x : 0, y : 0 }}>
						<div className='circle'
							ref={outletDragRef}>
						</div>
					</Draggable>
					<ParameterDisplayValueContainer
						id={id}
						instanceId={instanceId}
					/>
				</div>
				<div className='control'>
					<ParameterControlContainer
						id={id}
						instanceId={instanceId}
					/>
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
	onDisconnectStart         : PropTypes.func,
	onDisconnectStop          : PropTypes.func,
	onValueCodeChange         : PropTypes.func,
	outletTransferDragMethods : PropTypes.shape({
		getDragRef  : PropTypes.func,
		onDragStart : PropTypes.func,
		onDragMove  : PropTypes.func,
		onDragStop  : PropTypes.func,
	}),
}

export default ParameterHandle

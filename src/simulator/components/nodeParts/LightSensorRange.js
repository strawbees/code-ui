import React from 'react'
import PropTypes from 'prop-types'

class LightSensorRange extends React.Component {
	constructor(props) {
		super(props)
		this.input = React.createRef()
	}

	onKeyDown = (e) => {
		if (e.keyCode !== 13) {
			return
		}
		if (this.props.blurOnEnter) {
			this.input.current.blur()
		}
	}

	cancelEvent = (e) => {
		e.preventDefault()
		e.stopPropagation()
	}

	render() {
		const {
			onKeyDown,
			cancelEvent
		} = this
		const {
			value,
			onChange,
			min,
			max,
			step,
		} = this.props

		return (
			<div className='root LightSensorRange'>
				<style jsx>{`
					.root {
						height: 20px;
						position: relative;
						background-color: transparent;
						display: flex;
						flex-direction: column;
						border-radius: 20px;
						width: 60px;
					}
					.container {
						height: 100%;
						margin: 0;
						position: relative;
						display: flex;
						flex-direction: row;
						align-items: center;
					}
					.container .track {
						border: solid 2px rgb(51,51,51);
						position: absolute;
						width: 100%;
						box-sizing: border-box;
						height: 15px;
						background: rgb(0,0,0);
						background: linear-gradient(90deg, rgba(80,80,80,1) 0%, rgba(255,255,255,1) 100%);
						margin: 0;
						border-radius: 15px;
					}
					.container .progress {
						position: absolute;
						height: 100%;
						width: ${Math.min(100 * ((value - min) / (max - min)), 100)}%;
						background-color: transparent;
						border-radius: 0.5rem;
					}
					input[type=range] {
						position: absolute;
						-webkit-appearance: none; /* Hides the slider so that custom slider can be made */
						width: 100%; /* Specific width is required for Firefox. */
						background: transparent; /* Otherwise white in Chrome */
						margin: 0;
					}

					input[type=range]:focus {
						outline: none; /* Removes the blue border. You should probably do some kind of focus styling for accessibility reasons though. */
					}
					input[type='range']::-moz-focus-outer {
						border: 0;
					}
					input[type=range]::-webkit-slider-thumb {
						-webkit-appearance: none;
						border: solid 2px rgb(51,51,51);
						height: 25px;
						width: 25px;
						border-radius: 25px;
						background: white;
						cursor: pointer;
						margin-top: 0;
						box-sizing: border-box;
					}
					input[type=range]::-moz-range-thumb {
						border: solid 2px rgb(51,51,51);
						height: 25px;
						width: 25px;
						border-radius: 25px;
						background: white;
						cursor: pointer;
						margin-top: 0;
						box-sizing: border-box;
					}
					input[type=range]::-ms-thumb {
						border: solid 2px rgb(51,51,51);
						height: 25px;
						width: 25px;
						border-radius: 25px;
						background: white;
						cursor: pointer;
						margin-top: 0;
						box-sizing: border-box;
					}
					input[type=range]:focus::-webkit-slider-thumb {
						border: solid 5px rgb(51,51,51);
					}
					input[type=range]:focus::-moz-range-thumb {
						border: solid 5px rgb(51,51,51);
					}
					input[type=range]:focus::-ms-thumb {
						border: solid 5px rgb(51,51,51);
					}

					input[type=range]::-webkit-slider-runnable-track {
						width: 100%;
						height: 100%;
						cursor: pointer;
						background: transparent;
						border: none;
					}
					input[type=range]::-moz-range-track {
						width: 100%;
						height: 100%;
						cursor: pointer;
						background: transparent;
						border: none;
					}
					input[type=range]::-ms-track {
						width: 100%;
						height: 100%;
						cursor: pointer;
						background: transparent;
						border: none;
					}
					input[type=range]::-ms-fill-lower {
						background: rgba(0,0,0,0);
						border: none;
					}
					input[type=range]::-ms-fill-upper {
						background: rgba(0,0,0,0);
						border: none;
					}
				`}</style>
				<div className='container'>
					<div className='track'>
						<div className='progress'></div>
					</div>
					<input
						type='range'
						ref={this.input}
						min={min}
						max={max}
						step={step}
						value={value}
						onKeyDown={onKeyDown}
						onFocus={cancelEvent}
						onChange={(e) => onChange(e.target.value)}
					/>
				</div>
			</div>
		)
	}
}

LightSensorRange.defaultProps = {
	min  : 0,
	max  : 1,
	step : 0.01
}

LightSensorRange.propTypes = {
	min         : PropTypes.number,
	max         : PropTypes.number,
	step        : PropTypes.number,
	value       : PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
	onChange    : PropTypes.func,
	blurOnEnter : PropTypes.bool,
}

export default LightSensorRange

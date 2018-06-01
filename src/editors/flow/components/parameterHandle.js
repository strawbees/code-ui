import PropTypes from 'prop-types'
import tinycolor from 'tinycolor2'
import ParameterDisplayValueContainer from 'src/editors/flow/containers/parameterDisplayValueContainer'
import ParameterControlContainer from 'src/editors/flow/containers/parameterControlContainer'
import {
	GRAY,
	YELLOW,
} from 'src/constants/colors'

const cancelEvent = (e) => {
	e.preventDefault()
	e.stopPropagation()
}

const ParameterHandle = ({
	id,
	instanceId,
	connected,
}) =>
	<div className={`root parameterHandle ${connected ? 'connected' : ''}`}
		tabIndex='0'
		onKeyUp={cancelEvent}>
		<style jsx>{`
			.root {
				position: relative;
				display: flex;
				flex-direction: column;
				align-items: flex-start
			}
			.root:focus {
				outline: none;
			}
			.value {
				display: flex;
				flex-direction: row;
				align-items: center;
				height: 1rem;
				position: relative;
			}
			.value .circle {
				width: 1rem;
				height: 1rem;
				border-radius: 1rem;
				background-color: ${tinycolor(GRAY).lighten(20).toRgbString()};
				position: absolute;
				left: -0.5rem;
				top: 0;
			}
			.root.connected .value .circle {
				background-color: ${tinycolor(YELLOW).toRgbString()};
			}
			.value :global(> .parameterDisplayValue) {
				background-color: white;
				padding: 0 0.5rem 0 0.75rem;
				border-top-right-radius: 1rem;
				border-bottom-right-radius: 1rem;
				height: 1rem;
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
		`}</style>
		<div className='value'>
			<div className='circle'></div>
			<ParameterDisplayValueContainer id={id} instanceId={instanceId} />
		</div>
		<div className='control'>
			<ParameterControlContainer id={id} instanceId={instanceId} />
		</div>
	</div>

ParameterHandle.propTypes = {
	id         : PropTypes.string,
	instanceId : PropTypes.string,
	connected  : PropTypes.bool,
}

export default ParameterHandle

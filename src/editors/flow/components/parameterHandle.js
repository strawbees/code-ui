import PropTypes from 'prop-types'
import tinycolor from 'tinycolor2'
import ParameterDisplayValueContainer from 'src/editors/flow/containers/parameterDisplayValueContainer'
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
	valueCode,
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
				background-color: white;
				display: none;
				z-index: 2;
			}
			.root:focus .control,
			.root:focus-within .control {
				display: block;
				position: absolute;
			}
		`}</style>
		<div className='value'>
			<div className='circle'></div>
			<ParameterDisplayValueContainer id={id} instanceId={instanceId} />
		</div>
		<div className='control'>
			{valueCode}
		</div>
	</div>

ParameterHandle.propTypes = {
	id         : PropTypes.string,
	instanceId : PropTypes.string,
	connected  : PropTypes.bool,
	valueCode  : PropTypes.string,
}

export default ParameterHandle

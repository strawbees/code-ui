import PropTypes from 'prop-types'
import tinycolor from 'tinycolor2'
import DelayedInput from 'src/editors/flow/components/delayedInput'
import {
	GRAY,
	YELLOW
} from 'src/constants/colors'

const ParameterControl = ({
	valueCode,
	onValueCodeChange,
}) =>
	<div className='root parameterControl'>
		<style jsx>{`
			.root {
				position: relative;
				display: flex;
				flex-direction: column;
				align-items: stretch;
				background-color: ${tinycolor(GRAY).lighten(20).toRgbString()};
				min-width: 10rem;
			}
			.root :global(>.delayedInput input) {
				text-align: left;
				padding-left: 0.75rem;
			}
		`}</style>
		<DelayedInput
			value={valueCode}
			onChange={onValueCodeChange}
			color={YELLOW}
		/>
	</div>

ParameterControl.propTypes = {
	valueCode         : PropTypes.string,
	onValueCodeChange : PropTypes.func,
}

export default ParameterControl

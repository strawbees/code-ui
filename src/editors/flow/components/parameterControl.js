import PropTypes from 'prop-types'
import tinycolor from 'tinycolor2'
import DelayedInput from 'src/editors/flow/components/delayedInput'
import ParameterDisplayValueList from 'src/editors/flow/components/parameterDisplayValueList'
import {
	GRAY,
	YELLOW
} from 'src/constants/colors'

const ParameterControl = ({
	valueCode,
	validation,
	onValueCodeChange,
}) =>
	<div className='root parameterControl'>
		<style jsx>{`
			.root {
				position: relative;
				display: flex;
				flex-direction: column;
				align-items: stretch;
				background-color: ${tinycolor(GRAY).toRgbString()};
				min-width: 10rem;
				border: solid 0.2rem ${tinycolor(GRAY).toRgbString()};
				margin-left: -0.2rem;
				margin-top: -0.2rem;
				box-sizing: content-box;
			}
			.root :global(>.delayedInput input) {
				text-align: left;
				padding-left: 0.75rem;
			}
		`}</style>
		<DelayedInput
			value={valueCode}
			onChange={onValueCodeChange}
			blurOnEnter={true}
			color={YELLOW}
		/>
		{validation && validation.type === 'list' &&
			<ParameterDisplayValueList
				value={valueCode}
				onChange={onValueCodeChange}
				items={validation.data}
			/>
		}
	</div>

ParameterControl.propTypes = {
	valueCode  : PropTypes.string,
	validation : PropTypes.shape({
		type : PropTypes.string,
		data : PropTypes.oneOfType([
			PropTypes.array,
			PropTypes.object
		]),
	}),
	onValueCodeChange : PropTypes.func,
}

export default ParameterControl

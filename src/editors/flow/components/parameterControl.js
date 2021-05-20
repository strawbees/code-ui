import PropTypes from 'prop-types'
import tinycolor from 'tinycolor2'
import Range from 'src/editors/flow/components/range'
import DelayedInput from 'src/editors/flow/components/delayedInput'
import ParameterDisplayValueList from 'src/editors/flow/components/parameterDisplayValueList'

const ParameterControl = ({
	color,
	valueCode,
	validation,
	onValueCodeChange,
	disabled,
}) =>
	<div className='root parameterControl'>
		<style jsx>{`
			.root {
				position: relative;
				display: flex;
				flex-direction: column;
				align-items: stretch;
				background-color: ${tinycolor(color).toRgbString()};
				min-width: 13rem;
				border: solid 0.4rem ${tinycolor(color).toRgbString()};
				box-sizing: content-box;
				border-radius: 0.375rem;
				cursor: default;
			}
			.root :global(>.delayedInput input) {
				text-align: left;
				padding-left: 0.75rem;
			}
			.root :global(>.parameterDisplayValueList),
			.root :global(>.range) {
				margin-top: 0.4rem;
			}
			.triangle {
				position: absolute;
				left: -0.9rem;
				top: 0rem;
				width: 0;
				height: 0;
				border-top: 0.5rem solid transparent;
				border-bottom: 0.5rem solid transparent;
				border-right: 0.6rem solid ${tinycolor(color).toRgbString()};
			}
		`}</style>
		<DelayedInput
			value={valueCode}
			onChange={onValueCodeChange}
			blurOnEnter={true}
			disabled={disabled}
		/>
		{validation && validation.type === 'list' &&
			<ParameterDisplayValueList
				color={color}
				value={valueCode}
				onChange={onValueCodeChange}
				items={validation.data}
			/>
		}
		{validation && validation.type === 'range' &&
			<Range
				color={color}
				value={valueCode}
				onChange={onValueCodeChange}
				min={validation.data.min}
				max={validation.data.max}
				blurOnEnter={true}
				disabled={disabled}
			/>
		}
		<div className='triangle'/>
	</div>

ParameterControl.propTypes = {
	color      : PropTypes.string,
	valueCode  : PropTypes.string,
	validation : PropTypes.shape({
		type : PropTypes.string,
		data : PropTypes.oneOfType([
			PropTypes.array,
			PropTypes.object,
		]),
	}),
	onValueCodeChange : PropTypes.func,
	disabled          : PropTypes.bool,
}

export default ParameterControl

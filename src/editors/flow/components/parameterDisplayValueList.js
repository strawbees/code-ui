import PropTypes from 'prop-types'
import tinycolor from 'tinycolor2'
import ParameterDisplayValue from 'src/editors/flow/components/parameterDisplayValue'
import {
	GRAY,
	WHITE,
} from 'src/constants/colors'

const ParameterDisplayValueList = ({
	color,
	value,
	onChange,
	items
}) =>
	<div className='root parameterDisplayValueList'>
		<style jsx>{`
			.root {
				height: ${items.length > 4 ? `${4.5 * 2}rem` : `${items.length * 2}rem`};
				overflow-y: auto;
				border-radius: 0.25rem;
			}
			.items {
				display: flex;
				flex-direction: column;
				background-color: ${tinycolor(WHITE).toRgbString()};
			}
			.root button {
				box-sizing: border-box;
				background-color: ${tinycolor(WHITE).toRgbString()};
				height: 2rem;
				overflow-y: hidden;
			}
			.root button .wrapper{
				padding-left: 0.4rem;
				height: 2rem;
				display: flex;
				flex-direction: row;
				align-items: center;
			}
			.root button:nth-child(odd) {
				background-color: ${tinycolor(GRAY).lighten(35).toRgbString()};
			}
			.root button.selected {
				background-color: ${tinycolor(color).setAlpha(0.5).toRgbString()};
			}
			.root button:focus {
				outline: none;
			}
			.root button:hover .wrapper,
			.root button:focus .wrapper {
				background-color: ${tinycolor(color).setAlpha(0.2).toRgbString()};
			}
			.root button.selected:hover .wrapper,
			.root button.selected:focus .wrapper{
				background-color: ${tinycolor(color).darken(15).setAlpha(0.2).toRgbString()};
			}
			.root button:active .wrapper {
				background-color: ${tinycolor(color).darken(15).setAlpha(0.5).toRgbString()};
			}
			.root :global(.parameterDisplayValue) {
				transform-origin: center left;
				transform: scale3d(1.25,1.25,1.25);
			}
		`}</style>
		<div className='items' role='menu'>
			{items && items.map(item =>
				<button
					key={item.code}
					role='menuitem'
					className={`item ${item.code === value ? 'selected' : ''}`}
					onClick={() => {
						onChange(item.code)
						document.activeElement.blur()
					}}>
					<div className='wrapper'>
						<ParameterDisplayValue
							type={item.type}
							text={item.display}
							icon={item.icon}
						/>
					</div>
				</button>
			)}
		</div>
	</div>

ParameterDisplayValueList.propTypes = {
	color    : PropTypes.string,
	value    : PropTypes.string,
	onChange : PropTypes.func,
	items    : PropTypes.arrayOf(PropTypes.shape({
		type    : PropTypes.oneOf(['CONSTANT', 'OUTLET', 'NUMBER']),
		display : PropTypes.string,
		code    : PropTypes.string,
		icon    : PropTypes.func,
	})),
}

export default ParameterDisplayValueList

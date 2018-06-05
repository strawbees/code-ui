import PropTypes from 'prop-types'
import tinycolor from 'tinycolor2'
import ParameterDisplayValue from 'src/editors/flow/components/parameterDisplayValue'
import {
	GRAY,
	YELLOW,
} from 'src/constants/colors'

const ParameterDisplayValueList = ({
	value,
	onChange,
	items
}) =>
	<div className='root parameterDisplayValueList'>
		<style jsx>{`
			.root {
				height: ${items.length > 6 ? `${6.5 * 1.25}rem` : `${items.length * 1.25}rem`};
				overflow-y: scroll;
			}
			.items {
				display: flex;
				flex-direction: column;
			}
			.root button {
				background-color: white;
				height: 1.25rem;
			}
			.root button .focus{
				padding-left: 0.25rem;
			}
			.root button:nth-child(odd) {
				background-color: ${tinycolor(GRAY).lighten(35).toRgbString()};
			}
			.root button.selected {
				background-color: ${tinycolor(YELLOW).toRgbString()};
			}
			.root button:focus {
				outline: none;
			}
			.root button:focus .focus{
				background-color: ${tinycolor(YELLOW).setAlpha(0.3).toRgbString()};
			}
			.root button.selected :focus .focus{
				background-color: ${tinycolor(YELLOW).darken(20).setAlpha(0.3).toRgbString()};
			}
		`}</style>
		<div className='items'>
			{items && items.map(item =>
				<button
					key={item.code}
					className={`${item.code === value ? 'selected' : ''}`}
					onClick={(e) => {
						onChange(item.code)
						const target = e.currentTarget
						// setTimeout(() => target.blur(), 500)
						target.blur()
					}}>
					<div className='focus'>
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

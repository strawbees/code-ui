import PropTypes from 'prop-types'
import SvgIcon from 'src/components/svgIcon'

const ParameterDisplayValue = ({
	type,
	text,
	icon
}) =>
	<div className='root parameterDisplayValue'>
		<style jsx>{`
			.root {
				display: flex;
				flex-direction: row;
				align-items: center;
				font-size: 0.7rem;
			}
			.root :global(>.svgIcon){
				width: 1rem;
				height: 1rem;
				margin-right: 0.2rem;
			}
			.text.NUMBER {
				font-family: 'Code', monospace;
			}
		`}</style>
		{icon &&
			<SvgIcon icon={icon}/>
		}
		{(typeof text !== 'undefined') &&
			<div className={`text ${type}`}>
				{text}
			</div>
		}
	</div>

ParameterDisplayValue.propTypes = {
	type : PropTypes.oneOf(['CONSTANT', 'CONNECTIION', 'NUMBER']),
	text : PropTypes.string,
	icon : PropTypes.func,
}

export default ParameterDisplayValue

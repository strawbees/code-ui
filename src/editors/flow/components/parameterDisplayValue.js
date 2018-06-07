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
				font-size: 0.8rem;
			}
			.root :global(>.svgIcon){
				width: 1.7rem;
				height: 1.7rem;
			}
			.root :global(.svgIcon+.text){
				margin-left: 0.25rem;
			}
			.text.NUMBER {
				padding: 0 0.2rem;
				font-family: 'Code', monospace;
			}
		`}</style>
		{icon &&
			<SvgIcon icon={icon}/>
		}
		{(typeof text !== 'undefined') && type !== 'OUTLET' &&
			<div className={`text ${type}`}>
				{text}
			</div>
		}
	</div>

ParameterDisplayValue.propTypes = {
	type : PropTypes.oneOf(['CONSTANT', 'OUTLET', 'NUMBER']),
	text : PropTypes.string,
	icon : PropTypes.func,
}

export default ParameterDisplayValue

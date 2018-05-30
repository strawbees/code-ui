import PropTypes from 'prop-types'
import tinycolor from 'tinycolor2'

const ParameterDisplayValue = ({
	type,
	text,
	icon
}) =>
	<div className='root parameterDisplayValue'>
		<style jsx>{`
			.root {

			}
		`}</style>
		{type}
	</div>

ParameterDisplayValue.propTypes = {
	type : PropTypes.oneOf(['CONSTANT', 'CONNECTIION', 'VALUE']),
	text : PropTypes.string,
	icon : PropTypes.func,
}

export default ParameterDisplayValue

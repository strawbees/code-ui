import PropTypes from 'prop-types'
import tinycolor from 'tinycolor2'
import ParameterDisplayValueContainer from 'src/editors/flow/containers/parameterDisplayValueContainer'

const ParameterHandle = ({
	connected,
	value
}) =>
	<div className='root parameterHandle'>
		<style jsx>{`
			.root {

			}
		`}</style>
		<ParameterDisplayValueContainer value={value} />
	</div>

ParameterHandle.propTypes = {
	connected : PropTypes.bool,
	value     : PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

export default ParameterHandle

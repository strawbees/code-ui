import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ParameterDisplayValue from 'src/editors/flow/components/parameterDisplayValue'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const ParameterDisplayValueContainer = (props) =>
	<ParameterDisplayValue {...props} />

ParameterDisplayValueContainer.propTypes = {
	value : PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(ParameterDisplayValueContainer)

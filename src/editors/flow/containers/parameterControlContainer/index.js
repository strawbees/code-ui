import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ParameterControl from 'src/editors/flow/components/parameterControl'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const ParameterControlContainer = (props) =>
	<ParameterControl {...props} />

ParameterControlContainer.propTypes = {
	id         : PropTypes.string,
	instanceId : PropTypes.string,
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(ParameterControlContainer)

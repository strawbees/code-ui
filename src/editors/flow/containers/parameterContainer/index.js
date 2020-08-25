import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Parameter from 'src/editors/flow/components/parameter'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const ParameterContainer = (props) =>
	<Parameter {...props} />

ParameterContainer.propTypes = {
	id         : PropTypes.string,
	instanceId : PropTypes.string,
}

const parameterContainerConnected = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(ParameterContainer)

export default parameterContainerConnected

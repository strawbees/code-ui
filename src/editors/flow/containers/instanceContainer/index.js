import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Instance from 'src/editors/flow/components/instance'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const InstanceContainer = (props) =>
	<Instance {...props} />

InstanceContainer.propTypes = {
	id : PropTypes.string,
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(InstanceContainer)

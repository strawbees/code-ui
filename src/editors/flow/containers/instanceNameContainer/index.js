import { connect } from 'react-redux'
import InstanceName from 'src/editors/flow/components/instanceName'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const instanceNameContainerConnected = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(InstanceName)

export default instanceNameContainerConnected

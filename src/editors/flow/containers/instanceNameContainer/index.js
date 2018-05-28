import { connect } from 'react-redux'
import InstanceName from 'src/editors/flow/components/instanceName'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(InstanceName)

import { connect } from 'react-redux'
import ConnectionLines from 'src/editors/flow/components/connectionLines'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const ConnectionLinesContainer = (props) =>
	<ConnectionLines {...props} />

const connectionLinesContainerConnected = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(ConnectionLinesContainer)

export default connectionLinesContainerConnected

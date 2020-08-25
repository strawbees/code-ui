import { connect } from 'react-redux'
import ProgramCreator from 'src/components/programCreator'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const ProgramCreatorContainer = (props) =>
	<ProgramCreator {...props} />

const programCreatorContainerConnected = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(ProgramCreatorContainer)

export default programCreatorContainerConnected

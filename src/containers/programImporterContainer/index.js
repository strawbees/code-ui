import { connect } from 'react-redux'
import ProgramImporter from 'src/components/programImporter'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const ProgramImporterContainer = (props) =>
	<ProgramImporter {...props} />

const programImporterContainerConnected = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(ProgramImporterContainer)

export default programImporterContainerConnected

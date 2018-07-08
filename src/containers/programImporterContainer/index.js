import { connect } from 'react-redux'
import ProgramImporter from 'src/components/programImporter'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const ProgramImporterContainer = (props) =>
	<ProgramImporter {...props} />

export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(ProgramImporterContainer)

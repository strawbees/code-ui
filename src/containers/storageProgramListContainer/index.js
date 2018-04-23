import { connect } from 'react-redux'
import StorageProgramList from 'src/components/storageProgramList'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(StorageProgramList)

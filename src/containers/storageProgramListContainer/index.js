import { connect } from 'react-redux'
import ProgramList from 'src/components/programList'
import StorageProgramListItemContainer from 'src/containers/storageProgramListItemContainer'

import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const StorageProgramListContainer = (props) =>
	<ProgramList
		{...props}
		ItemContainer={StorageProgramListItemContainer}
	/>

export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(StorageProgramListContainer)

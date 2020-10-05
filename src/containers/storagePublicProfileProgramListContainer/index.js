import { connect } from 'react-redux'
import ProgramList from 'src/components/programList'
import StoragePublicProfileProgramListItemContainer from 'src/containers/storagePublicProfileProgramListItemContainer'

import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const StoragePublicProfileProgramListContainer = (props) =>
	<ProgramList
		{...props}
		ItemContainer={StoragePublicProfileProgramListItemContainer}
	/>

const storagePublicProfileProgramListContainerConnected = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(StoragePublicProfileProgramListContainer)

export default storagePublicProfileProgramListContainerConnected

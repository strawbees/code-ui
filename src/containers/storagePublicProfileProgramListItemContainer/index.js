import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ProgramListItem from 'src/components/programListItem'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const StoragePublicProfileProgramListItemContainer = props =>
	<ProgramListItem {...props} />

StoragePublicProfileProgramListItemContainer.propTypes = {
	id : PropTypes.string
}

const storagePublicProfileProgramListItemContainerConnected = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(StoragePublicProfileProgramListItemContainer)

export default storagePublicProfileProgramListItemContainerConnected

import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ProgramListItem from 'src/components/programListItem'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const StorageProgramListItemContainer = props =>
	<ProgramListItem {...props} />

StorageProgramListItemContainer.propTypes = {
	id : PropTypes.string
}

const storageProgramListItemContainerConnected = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(StorageProgramListItemContainer)

export default storageProgramListItemContainerConnected

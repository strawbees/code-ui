import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import StorageProgramListItem from 'src/components/storageProgramListItem'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const StorageProgramListItemContainer = props =>
	<StorageProgramListItem {...props} />

StorageProgramListItemContainer.propTypes = {
	id : PropTypes.string
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(StorageProgramListItem)

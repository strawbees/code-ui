import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import UserProgramListItem from 'src/components/userProgramListItem'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const UserProgramListItemContainer = props =>
	<UserProgramListItem {...props} />

UserProgramListItemContainer.propTypes = {
	id : PropTypes.string
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(UserProgramListItem)

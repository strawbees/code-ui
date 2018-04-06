import PropTypes from 'prop-types'
import UserProgramListItemContainer from 'src/containers/userProgramListItemContainer'

const UserProgramList = ({
	ids
}) =>
	<div className='root userProgramList'>
		{ids && ids.map(id =>
			<UserProgramListItemContainer key={id} id={id}/>
		)}
	</div>

UserProgramList.defaultProps = {
	ids : []
}

UserProgramList.propTypes = {
	ids : PropTypes.arrayOf(PropTypes.string)
}

export default UserProgramList

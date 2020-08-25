import PropTypes from 'prop-types'
import SvgIcon from 'src/components/svgIcon'
import userIcons from 'src/assets/icons/user'

const UserProfileAvatar = ({
	username,
	isAnon,
}) =>
	<div className='root userProfileAvatar'>
		<style jsx>{`
			.root {
				display: flex;
				flex-direction: column;
				align-items: center;
			}
			.name {
				display: flex;
				flex-direction: row;
				align-items: center;
			}
			.name :global(.svgIcon) {
				width: 3.5rem;
				height: 3.5rem;
				margin-right: 0.5rem;
			}
			.name .username {
				text-transform: none;
				margin-bottom: 0;
			}
			.profile-url {
				font-size: 0.8rem;
			}
			@media (max-width: 300px){
				.name .username {
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					max-width: 10rem;
				}

			}
		`}</style>

		<div className='name'>
			<SvgIcon icon={isAnon ? userIcons.anon : userIcons.user}/>
			<div className='username global-type global-type-h2'>
				{username}
			</div>
		</div>
	</div>

UserProfileAvatar.defaultProps = {
	isAnon : true
}

UserProfileAvatar.propTypes = {
	username : PropTypes.string,
	isAnon   : PropTypes.bool,
}

export default UserProfileAvatar

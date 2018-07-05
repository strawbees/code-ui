import PropTypes from 'prop-types'
import SvgIcon from 'src/components/svgIcon'
import userAnonIcon from 'src/assets/icons/user/anon.svg'
import userIcon from 'src/assets/icons/user/user.svg'

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
				width: 4.5rem;
				height: 3.5rem;
			}
			.name .username {
				text-transform: none;
				margin-bottom: 0;
			}
			.root :global(.message) {
				max-width: 30rem;
				margin: 0 0.5rem;
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
			{isAnon &&
				<SvgIcon icon={userAnonIcon}/>
			}
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

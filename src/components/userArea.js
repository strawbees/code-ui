import UserProfileAvatarContainer from 'src/containers/userProfileAvatarContainer'
import AccountSettingsContainer from 'src/containers/accountSettingsContainer'

const UserArea = () =>
	<div className='root userArea'>
		<style jsx>{`
			.root {
				display: flex;
				flex-direction: column;
				align-items: center;
				position: relative;
				flex-shrink: 0;
			}
			.root :global(.userProfileAvatar) {
				margin-bottom: 0.5rem;
			}
		`}</style>
		<UserProfileAvatarContainer />
		<AccountSettingsContainer />
	</div>

export default UserArea

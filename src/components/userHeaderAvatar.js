import PropTypes from 'prop-types'
import DropdownMenu from 'src/components/dropdownMenu'
import userIcons from 'src/assets/icons/user'
import syncIcon from 'src/assets/icons/general/sync.svg'
import { fireGlobalEvent } from 'src/utils/globalEvents'

import {
	NEEDS_SYNC,
	SYNCING,
	READY,
	ERROR
} from 'src/constants/storage'

const UserHeaderAvatar = ({
	profileUrl,
	username,
	isAnon,
	storageStatus,
	signup,
	signin,
	logout,
}) => {
	let icon
	if (storageStatus === SYNCING ||
		storageStatus === NEEDS_SYNC) {
		icon = syncIcon
	} else if (isAnon) {
		icon = userIcons.anon
	} else {
		icon = userIcons.user
	}
	return (
		<div className={`root userHeaderAvatar ${storageStatus}`}>
			<style jsx>{`
				.root :global(a) {
					text-decoration: none;
				}
				.root :global(.link:focus) {
					outline: none;
				}
				.root :global(> .dropdownMenu) {
					height: 100%;
				}
				.root.SYNCING :global(.dropdownMenu .icon),
				.root.NEEDS_SYNC :global(.dropdownMenu .icon) {
					animation: spin-animation 2s linear infinite reverse;
				}
				@keyframes spin-animation {
					from {
						transform: rotateZ(0);
					}
					to {
						transform: rotateZ(360deg);
					}
				}
			`}</style>
			<DropdownMenu
				label={username}
				alignRight={true}
				smallType={true}
				responsiveHideLabel={true}
				icon={icon}
				options={[
					{
						labelKey : 'ui.user.account_settings.profile',
						link     : profileUrl,
						onClick  : () => fireGlobalEvent('track-event', {
							category : 'ui',
							action   : 'go to profile',
							label    : 'user avatar menu'
						}),
						// icon     : userIcons.user,
					},
					!isAnon ? {
						divider  : true,
						labelKey : 'ui.user.account_settings.logout',
						onClick  : () => {
							logout()
							fireGlobalEvent('track-event', {
								category : 'ui',
								action   : 'logout',
								label    : 'user avatar menu'
							})
						},
						// icon     : userIcons.logout,
					} : null,
					isAnon ? {
						divider  : true,
						labelKey : 'ui.user.account_settings.signup',
						onClick  : () => {
							signup()
							fireGlobalEvent('track-event', {
								category : 'ui',
								action   : 'sign-up',
								label    : 'user avatar menu'
							})
						},
						// icon     : strawbeesIcon,
					} : null,
					isAnon ? {
						labelKey : 'ui.user.account_settings.signin',
						onClick  : () => {
							signin()
							fireGlobalEvent('track-event', {
								category : 'ui',
								action   : 'sign-in',
								label    : 'user avatar menu'
							})
						},
						// icon     : userIcons.login,
					} : null,
				]}
			/>
		</div>
	)
}

UserHeaderAvatar.propTypes = {
	profileUrl    : PropTypes.string,
	username      : PropTypes.string,
	isAnon        : PropTypes.bool,
	signin        : PropTypes.func,
	signup        : PropTypes.func,
	logout        : PropTypes.func,
	storageStatus : PropTypes.oneOf([
		NEEDS_SYNC,
		SYNCING,
		READY,
		ERROR
	])
}

export default UserHeaderAvatar

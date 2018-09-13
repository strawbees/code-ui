import PropTypes from 'prop-types'
import tinycolor from 'tinycolor2'
import Link from 'src/components/link'
import IconButton from 'src/components/iconButton'
import userIcons from 'src/assets/icons/user'
import syncIcon from 'src/assets/icons/general/sync.svg'
import {
	NEEDS_SYNC,
	SYNCING,
	READY,
	ERROR
} from 'src/constants/storage'
import {
	YELLOW
} from 'src/constants/colors'

const UserHeaderAvatar = ({
	profileUrl,
	username,
	isAnon,
	storageStatus,
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
				.root.SYNCING :global(.link .svgIcon),
				.root.NEEDS_SYNC :global(.link .svgIcon) {
					fill: ${tinycolor(YELLOW).darken(10).toRgbString()};
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
			<Link to={profileUrl}>
				<IconButton
					icon={icon}
					labelKey={username}
					hideLabelOnMediaQuery={'max-width: 1020px'}
					tabIndex='-1'
				/>
			</Link>
		</div>
	)
}

UserHeaderAvatar.propTypes = {
	profileUrl    : PropTypes.string,
	username      : PropTypes.string,
	isAnon        : PropTypes.bool,
	storageStatus : PropTypes.oneOf([
		NEEDS_SYNC,
		SYNCING,
		READY,
		ERROR
	])
}


export default UserHeaderAvatar

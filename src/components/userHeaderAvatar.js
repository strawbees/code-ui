import PropTypes from 'prop-types'
import Link from 'src/components/link'
import IconButton from 'src/components/iconButton'
import userIcons from 'src/assets/icons/user'

const UserHeaderAvatar = ({
	profileUrl,
	username,
	isAnon,
}) =>
	<div className='root userHeaderAvatar'>
		<style jsx>{`
			.root :global(a) {
				text-decoration: none;
			}
			.root :global(.link:focus) {
				outline: none;
			}
		`}</style>
		<Link to={profileUrl}>
			<IconButton
				icon={isAnon ? userIcons.anon : userIcons.user}
				labelKey={username}
				hideLabelOnMediaQuery={'max-width: 950px'}
				tabIndex='-1'
			/>
		</Link>
	</div>

UserHeaderAvatar.propTypes = {
	profileUrl : PropTypes.string,
	username   : PropTypes.string,
	isAnon     : PropTypes.bool,
}


export default UserHeaderAvatar

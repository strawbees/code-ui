import PropTypes from 'prop-types'
import Link from 'src/components/link'
import IconButton from 'src/components/iconButton'
import userAnonIcon from 'src/assets/icons/user/anon.svg'
import userIcon from 'src/assets/icons/user/user.svg'

const UserHeaderAvatar = ({
	profileUrl,
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
			{isAnon &&
				<IconButton
					icon={userAnonIcon}
					labelKey={'ui.user.anon_username'}
					hideLabelOnMediaQuery={'max-width: 950px'}
					tabIndex='-1'
				/>
			}
			{!isAnon &&
				<IconButton
					icon={userIcon}
					label='Fake user'
					hideLabelOnMediaQuery={'max-width: 950px'}
					tabIndex='-1'
				/>
			}
		</Link>
	</div>

UserHeaderAvatar.defaultProps = {
	isAnon : true
}

UserHeaderAvatar.propTypes = {
	profileUrl : PropTypes.string,
	isAnon     : PropTypes.bool,
}


export default UserHeaderAvatar

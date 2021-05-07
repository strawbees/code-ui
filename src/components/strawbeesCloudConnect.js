import PropTypes from 'prop-types'
import tinycolor from 'tinycolor2'
import IconButton from 'src/components/iconButton'
// import SvgIcon from 'src/components/svgIcon'
// import signupIcon from 'src/assets/icons/storage/strawbees.svg'
// import signinIcon from 'src/assets/icons/user/login.svg'
import { fireGlobalEvent } from 'src/utils/globalEvents'

import {
	WHITE,
	PINK,
	BLUE,
	BLACK,
} from 'src/constants/colors'

const StrawbeesCloudConnect = ({
	signin,
	signup,
}) =>
	<div className='root strawbeesCloudConnect'>
		<style jsx>{`
			.root {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				position: relative;
			}
			.logo {
				font-weight: bold;
				font-size: 1.5rem;
				color: ${tinycolor(BLACK).toRgbString()};
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				position: relative;
			}
			.logo :global(.svgIcon) {
				width: 7rem;
				height: 6rem;
			}
			.nav {
				/*margin-top: 1rem;*/
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
			}
			.nav :global(> *) {
				margin: 0 0.5rem;
			}
		`}</style>
		{/* <div className='logo'>
			<SvgIcon icon={signupIcon}/>
			Strawbees Cloud
		</div> */}
		<div className='nav'>
			<IconButton
				// icon={signupIcon}
				labelKey='ui.sb_cloud.signup.cta'
				bgColor={PINK}
				bgHoverColor={PINK}
				textColor={WHITE}
				textHoverColor={WHITE}
				onClick={() => {
					signup()
					fireGlobalEvent('track-event', {
						category : 'ui',
						action   : 'sign-up',
						label    : 'account settings',
					})
				}}
			/>
			<IconButton
				// icon={signinIcon}
				labelKey='ui.sb_cloud.signin.cta'
				bgColor={BLUE}
				bgHoverColor={BLUE}
				textColor={WHITE}
				textHoverColor={WHITE}
				onClick={() => {
					signin()
					fireGlobalEvent('track-event', {
						category : 'ui',
						action   : 'sign-in',
						label    : 'account settings',
					})
				}}
			/>
		</div>
	</div>

StrawbeesCloudConnect.propTypes = {
	signin : PropTypes.func,
	signup : PropTypes.func,
}

export default StrawbeesCloudConnect

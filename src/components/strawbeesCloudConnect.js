import PropTypes from 'prop-types'
import tinycolor from 'tinycolor2'
import IconButton from 'src/components/iconButton'
import SvgIcon from 'src/components/svgIcon'
import strawbeesIcon from 'src/assets/icons/storage/strawbees.svg'
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
				margin-top: 1rem;
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
			}
			.nav :global(> *) {
				margin: 0 0.5rem;
			}
		`}</style>
		<div className='logo'>
			<SvgIcon icon={strawbeesIcon}/>
			Strawbees Cloud
		</div>
		<div className='nav'>
			<IconButton
				labelKey='ui.sb_cloud.signup.cta'
				bgColor={PINK}
				bgHoverColor={PINK}
				textColor={WHITE}
				textHoverColor={WHITE}
				onClick={signup}
			/>
			<IconButton
				labelKey='ui.sb_cloud.signin.cta'
				bgColor={BLUE}
				bgHoverColor={BLUE}
				textColor={WHITE}
				textHoverColor={WHITE}
				onClick={signin}
			/>
		</div>
	</div>

StrawbeesCloudConnect.propTypes = {
	signin : PropTypes.func,
	signup : PropTypes.func,
}

export default StrawbeesCloudConnect

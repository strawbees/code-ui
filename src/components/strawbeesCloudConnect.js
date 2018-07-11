import React from 'react'
import PropTypes from 'prop-types'
import tinycolor from 'tinycolor2'
import IconButton from 'src/components/iconButton'
import StrawbeesCloudSignup from 'src/components/strawbeesCloudSignup'
import StrawbeesCloudSignin from 'src/components/strawbeesCloudSignin'
import {
	WHITE,
	PINK,
	BLUE,
} from 'src/constants/colors'

class StrawbeesCloudConnect extends React.Component {
	openSignin = () => {
		const {
			safeOpenDialogModal,
			onSignin,
			onForgotPassword,
		} = this.props
		safeOpenDialogModal(
			{
				titleKey       : 'ui.sb_cloud.nav.signin',
				displayConfirm : false,
				displayCancel  : false
			},
			<StrawbeesCloudSignin
				onSignin={onSignin}
				onForgotPassword={onForgotPassword}
			/>
		)
	}

	openSignup = () => {
		const {
			safeOpenDialogModal,
			onSignup,
		} = this.props
		safeOpenDialogModal(
			{
				titleKey       : 'ui.sb_cloud.nav.signup',
				displayConfirm : false,
				displayCancel  : false
			},
			<StrawbeesCloudSignup onSignup={onSignup} />
		)
	}

	render() {
		const {
			openSignin,
			openSignup,
		} = this
		return (
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
						color: ${tinycolor(BLUE).toRgbString()};
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
					Strawbees Cloud
				</div>
				<div className='nav'>
					<IconButton
						labelKey='ui.sb_cloud.nav.signup'
						bgColor={PINK}
						bgHoverColor={PINK}
						textColor={WHITE}
						textHoverColor={WHITE}
						onClick={openSignup}
					/>
					<IconButton
						labelKey='ui.sb_cloud.nav.signin'
						bgColor={BLUE}
						bgHoverColor={BLUE}
						textColor={WHITE}
						textHoverColor={WHITE}
						onClick={openSignin}
					/>
				</div>
			</div>
		)
	}
}

StrawbeesCloudConnect.propTypes = {
	safeOpenDialogModal : PropTypes.func,
	onSignup            : PropTypes.func,
	onSignin            : PropTypes.func,
	onForgotPassword    : PropTypes.func,
}

export default StrawbeesCloudConnect

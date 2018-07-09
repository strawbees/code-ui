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
			authenticateUser,
			requestPasswordReset,
		} = this.props
		safeOpenDialogModal(
			{
				titleKey       : 'ui.sb_cloud.nav.signin',
				displayConfirm : false,
				displayCancel  : false
			},
			<StrawbeesCloudSignin
				authenticateUser={authenticateUser}
				requestPasswordReset={requestPasswordReset}
			/>
		)
	}

	openSignup = () => {
		const {
			safeOpenDialogModal,
			createUser,
		} = this.props
		safeOpenDialogModal(
			{
				titleKey       : 'ui.sb_cloud.nav.signup',
				displayConfirm : false,
				displayCancel  : false
			},
			<StrawbeesCloudSignup createUser={createUser} />
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
	safeOpenDialogModal  : PropTypes.func,
	createUser           : PropTypes.func,
	authenticateUser     : PropTypes.func,
	requestPasswordReset : PropTypes.func,
}

export default StrawbeesCloudConnect

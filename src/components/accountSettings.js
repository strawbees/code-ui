import React from 'react'
import PropTypes from 'prop-types'
import tinycolor from 'tinycolor2'
import IconButton from 'src/components/iconButton'
import CopyableUrl from 'src/components/copyableUrl'
import StrawbeesCloudConnectContainer from 'src/containers/strawbeesCloudConnectContainer'
import S from 'src/containers/sManager'
import userIcons from 'src/assets/icons/user'
import downloadDataIcon from 'src/assets/icons/file/downloadData.svg'
import warningIcon from 'src/assets/icons/general/warningLight.svg'
import preferencesIcon from 'src/assets/icons/general/preferences.svg'
import { fireGlobalEvent } from 'src/utils/globalEvents'
import {
	WHITE,
	GRAY,
	RED,
	YELLOW,
} from 'src/constants/colors'

class AccountSettings extends React.Component {
	constructor(props) {
		super(props)
		this.publicProfileUrlContainer = React.createRef()
	}

	selectPublicProfileUrlContainer = () => {
		this.publicProfileUrlContainer.current.focus()
		window.getSelection().selectAllChildren(this.publicProfileUrlContainer.current)
	}

	render() {
		const {
			isAnon,
			publicProfileUrl,
			logout,
			downloadData,
			deleteAccount,
			changePassword,
			isOpen,
			expandAccountSettings,
			collapseAccountSettings,
		} = this.props
		if (isAnon) {
			return <StrawbeesCloudConnectContainer />
		}
		return (
			<div className={`root accountSettings ${isOpen ? 'opened' : 'closed'}`}>
				<style jsx>{`
					.root {
						position: relative;
						display: flex;
						flex-direction: column;
						align-items: center;
					}
					.root :global(.message) {
						max-width: 30rem;
						margin: 0.5rem 0.5rem 0 0.5rem;
					}
					.expand {
						display: flex;
						flex-direction: column;
						align-items: center;
						align-self: stretch;
						padding: 0.5rem;
						margin: 0 0.5rem;
						border-radius: 0.5rem;
					}
					.root.opened .expand {
						background-color: ${tinycolor(WHITE).toRgbString()};
					}
					.expand .account-providers,
					.expand .settings {
						display: none;
						background-color: ${tinycolor(GRAY).lighten(35).toRgbString()};
						flex-direction: column;
						align-self: stretch;
						align-items: center;
						justify-content: center;
						padding: 1rem;
						margin-top: 0.5rem;
						border-radius: 0.5rem;
					}
					.root.opened .expand .account-providers,
					.root.opened .expand .settings {
						display: flex;
					}
					.expand .account-providers :global(> *){
						border: solid 0.05rem ${tinycolor(GRAY).toRgbString()};
						background-color: ${tinycolor(WHITE).toRgbString()};
						border-radius: 0.5rem;
						padding: 1rem;
						box-shadow: 0.15rem 0.15rem 0 0 rgba(0,0,0,0.2);
					}
					.settings .separator {
						width: 100%;
						border-top: solid 1px rgba(0,0,0,0.2);
						margin: 1rem 0;
					}
					.settings .danger {
						width: 100%;
						margin-bottom: 1rem;
						text-align: center;
						font-weight: bold;
					}
				`}</style>
				<div className='expand'>
					{isAnon &&
						<React.Fragment>
							<IconButton
								icon={userIcons.login}
								labelKey='ui.user.account_settings.annon'
								onClick={isOpen ? collapseAccountSettings : expandAccountSettings}
							/>
							<div className='account-providers'>
								<StrawbeesCloudConnectContainer />
							</div>
						</React.Fragment>
					}
					{!isAnon &&
						<React.Fragment>
							<IconButton
								icon={preferencesIcon}
								labelKey='ui.user.account_settings.button'
								onClick={() => {
									if (isOpen) {
										collapseAccountSettings()
									} else {
										expandAccountSettings()
									}
									fireGlobalEvent('track-event', {
										category : 'ui',
										action   : isOpen ? 'close account settings' : 'open account settings',
										label    : 'account settings',
									})
								}}
							/>
							<div className='settings'>
								<CopyableUrl
									titleKey='ui.user.account_settings.public_profile.title'
									descriptionKey='ui.user.account_settings.public_profile.description'
									url={publicProfileUrl}
									onCopy={() => {
										fireGlobalEvent('track-event', {
											category : 'ui',
											action   : 'copy profile url',
											label    : 'account settings',
										})
									}}
								/>
								<div className='separator'></div>
								<IconButton
									icon={userIcons.changePassword}
									labelKey='ui.user.account_settings.change_password'
									onClick={() => {
										changePassword()
										fireGlobalEvent('track-event', {
											category : 'ui',
											action   : 'change password',
											label    : 'account settings',
										})
									}}
								/>
								<IconButton
									icon={downloadDataIcon}
									labelKey='ui.user.account_settings.download_data'
									onClick={() => {
										downloadData()
										fireGlobalEvent('track-event', {
											category : 'ui',
											action   : 'download data',
											label    : 'account settings',
										})
									}}
								/>
								<IconButton
									icon={userIcons.logout}
									labelKey='ui.user.account_settings.logout'
									onClick={() => {
										logout()
										fireGlobalEvent('track-event', {
											category : 'ui',
											action   : 'logout',
											label    : 'account settings',
										})
									}}
								/>
								<div className='separator'></div>
								<div className='danger'>
									<S value='ui.user.account_settings.danger_zone'/>
								</div>
								<IconButton
									icon={warningIcon}
									labelKey='ui.user.account_settings.delete_account'
									bgColor={RED}
									textColor={YELLOW}
									bgHoverColor={RED}
									textHoverColor={YELLOW}
									onClick={() => {
										deleteAccount()
										fireGlobalEvent('track-event', {
											category : 'ui',
											action   : 'pressed delete account button',
											label    : 'account settings',
										})
									}}
								/>
							</div>
						</React.Fragment>
					}
				</div>
			</div>
		)
	}
}

AccountSettings.defaultProps = {
	isAnon : true,
}

AccountSettings.propTypes = {
	isAnon                  : PropTypes.bool,
	publicProfileUrl        : PropTypes.string,
	logout                  : PropTypes.func,
	deleteAccount           : PropTypes.func,
	downloadData            : PropTypes.func,
	changePassword          : PropTypes.func,
	isOpen                  : PropTypes.bool,
	expandAccountSettings   : PropTypes.func,
	collapseAccountSettings : PropTypes.func,
}

export default AccountSettings

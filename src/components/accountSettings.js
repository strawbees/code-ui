import React from 'react'
import PropTypes from 'prop-types'
import tinycolor from 'tinycolor2'
import IconButton from 'src/components/iconButton'
import Link from 'src/components/link'
import StrawbeesCloudConnectContainer from 'src/containers/strawbeesCloudConnectContainer'
import S from 'src/containers/sManager'
import userIcons from 'src/assets/icons/user'
import preferencesIcon from 'src/assets/icons/general/preferences.svg'
import {
	WHITE,
	GRAY,
	BLACK,
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
			isOpen,
			expandAccountSettings,
			collapseAccountSettings
		} = this.props
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
					.public-profile-url {
						margin-bottom: 1rem;
						display: flex;
						flex-direction: column;
						align-items: center;
					}
					.public-profile-url .title {
						font-weight: bold;
					}
					.public-profile-url :global(.url){
						font-size: 0.65rem;
						font-family: Code;
						background-color: ${tinycolor(WHITE).toRgbString()};
						color: ${tinycolor(BLACK).setAlpha(0.7).toRgbString()};
						padding: 0.25rem 0.5rem;
						border-radius: 0.2rem;

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
								onClick={isOpen ? collapseAccountSettings : expandAccountSettings}
							/>
							<div className='settings'>
								<div className='public-profile-url'>
									<div className='title'>
										<S value='ui.user.account_settings.public_profile.title' />
									</div>
									<div
										className='url'
										ref={this.publicProfileUrlContainer}
										onClick={this.selectPublicProfileUrlContainer}>
										{publicProfileUrl}
									</div>
								</div>
								<IconButton
									icon={userIcons.logout}
									labelKey='ui.user.account_settings.logout'
									onClick={logout}
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
	isAnon : true
}

AccountSettings.propTypes = {
	isAnon                  : PropTypes.bool,
	publicProfileUrl        : PropTypes.string,
	logout                  : PropTypes.func,
	isOpen                  : PropTypes.bool,
	expandAccountSettings   : PropTypes.func,
	collapseAccountSettings : PropTypes.func,
}


export default AccountSettings

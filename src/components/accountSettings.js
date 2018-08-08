import React from 'react'
import PropTypes from 'prop-types'
import tinycolor from 'tinycolor2'
import IconButton from 'src/components/iconButton'
import Message from 'src/components/message'
import S from 'src/containers/sManager'
import StrawbeesCloudConnectContainer from 'src/containers/strawbeesCloudConnectContainer'
import arrowIcon from 'src/assets/icons/general/arrowRight.svg'
import userIcons from 'src/assets/icons/user'
import preferencesIcon from 'src/assets/icons/general/preferences.svg'
import {
	WHITE,
	GRAY,
} from 'src/constants/colors'

class AccountSettings extends React.Component {
	state = {
		open : false
	}

	toggleOpen = () => {
		this.setState({ open : !this.state.open })
	}

	render() {
		const { open } = this.state
		const {
			isAnon,
			logout,
		} = this.props
		return (
			<div className={`root accountSettings ${open ? 'opened' : 'closed'}`}>
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
				`}</style>
				<div className='expand'>
					{isAnon &&
						<React.Fragment>
							<IconButton
								icon={arrowIcon}
								labelKey='ui.user.account_settings.annon'
								onClick={this.toggleOpen}
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
								onClick={this.toggleOpen}
							/>
							<div className='settings'>
								<IconButton
									icon={userIcons.logout}
									labelKey='ui.user.account_settings.logout'
									onClick={logout}
								/>
							</div>
						</React.Fragment>
					}
				</div>

				{/* isAnon &&
					<Message type='warning'>
						<S
							value='ui.user.anon_warning'
							markdown={true}
						/>
					</Message>
				*/}
			</div>
		)
	}
}

AccountSettings.defaultProps = {
	isAnon : true
}

AccountSettings.propTypes = {
	isAnon : PropTypes.bool,
	logout : PropTypes.func,
}


export default AccountSettings

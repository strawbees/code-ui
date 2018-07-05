import React from 'react'
import PropTypes from 'prop-types'
import tinycolor from 'tinycolor2'
import SvgIcon from 'src/components/svgIcon'
import IconButton from 'src/components/iconButton'
import Message from 'src/components/message'
import S from 'src/containers/sManager'
import arrowIcon from 'src/assets/icons/general/arrowRight.svg'
import {
	WHITE
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
		const { isAnon } = this.props
		return (
			<div className={`root accountSettings ${open ? 'opened' : 'closed'}`}>
				<style jsx>{`
					.root {
						display: flex;
						flex-direction: column;
						align-items: center;
						width: 50rem;
						max-width: 100%;
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
				`}</style>
				<div className='expand'>
					{isAnon &&
						<React.Fragment>
							<IconButton
								icon={arrowIcon}
								labelKey='ui.user.account_settings.annon'
								onClick={this.toggleOpen}
							/>
						</React.Fragment>
					}
				</div>

				{isAnon &&
					<Message type='warning'>
						<S
							value='ui.user.anon_warning'
							markdown={true}
						/>
					</Message>
				}
			</div>
		)
	}
}

AccountSettings.defaultProps = {
	isAnon : true
}

AccountSettings.propTypes = {
	isAnon : PropTypes.bool,
}


export default AccountSettings

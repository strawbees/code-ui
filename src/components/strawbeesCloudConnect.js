import React from 'react'
import PropTypes from 'prop-types'
import tinycolor from 'tinycolor2'
import IconButton from 'src/components/iconButton'
import FormInput from 'src/components/formInput'
import S from 'src/containers/sManager'
import {
	GRAY,
	BLACK,
	WHITE,
	PINK,
	BLUE,
} from 'src/constants/colors'

class StrawbeesCloudConnect extends React.Component {
	state = {
		tab : null
	}

	toggleJoinTab = () => {
		let tab = null
		if (this.state.tab !== 'join') {
			tab = 'join'
		}
		this.setState({ tab })
	}

	toggleLoginTab = () => {
		let tab = null
		if (this.state.tab !== 'login') {
			tab = 'login'
		}
		this.setState({ tab })
	}

	render() {
		const {
			tab
		} = this.state
		const {
			toggleJoinTab,
			toggleLoginTab,
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
					.tab {
						display: flex;
						margin-top: 1rem;
						padding: 0.5rem;
						border-radius: 0.5rem;
						align-self: stretch;
						background-color: ${tinycolor(GRAY).lighten(35).toRgbString()};
					}
				`}</style>
				<div className='logo'>
					Strawbees Cloud
				</div>
				<div className='nav'>
					<IconButton
						labelKey='ui.sb_cloud.nav.join'
						bgColor={PINK}
						bgHoverColor={PINK}
						textColor={WHITE}
						textHoverColor={WHITE}
						onClick={toggleJoinTab}
					/>
					<IconButton
						labelKey='ui.sb_cloud.nav.login'
						bgColor={BLUE}
						bgHoverColor={BLUE}
						textColor={WHITE}
						textHoverColor={WHITE}
						onClick={toggleLoginTab}
					/>
				</div>
				{tab === 'join' &&
					<div className='tab join'>
						
					</div>
				}
				{tab === 'login' &&
				<div className='tab login'>
				</div>
				}
			</div>
		)
	}
}

StrawbeesCloudConnect.propTypes = {
}

export default StrawbeesCloudConnect

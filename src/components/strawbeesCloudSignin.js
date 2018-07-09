import React from 'react'
import PropTypes from 'prop-types'
import tinycolor from 'tinycolor2'
import IconButton from 'src/components/iconButton'
import Message from 'src/components/message'
import S from 'src/containers/sManager'
import Form from 'src/components/form'
import {
	GRAY,
	WHITE,
} from 'src/constants/colors'

const signinFields = [
	{
		id       : 'signin-username',
		name     : 'username',
		type     : 'text',
		labelKey : 'ui.sb_cloud.signin.username.label',
		validate : (value) => {
			if (!value) {
				return 'blank'
			}
			return null
		},
		validateOnBlur : true,
		errorKeys      : {
			blank : 'ui.sb_cloud.signin.username.error.blank',
		},
	},
	{
		id       : 'signin-password',
		name     : 'password',
		type     : 'password',
		labelKey : 'ui.sb_cloud.signin.password.label',
		validate : (value) => {
			if (!value) {
				return 'blank'
			}
			return null
		},
		validateOnBlur : true,
		errorKeys      : {
			blank : 'ui.sb_cloud.signin.password.error.blank',
		},
	},
]
const signinErrorKeys = {
	NETWORK        : 'ui.sb_cloud.signin.submit.error.network',
	SERVER         : 'ui.sb_cloud.signin.submit.error.server',
	UNHADLED       : 'ui.sb_cloud.signin.submit.error.unhandled',
	NOT_AUTHORIZED : 'ui.sb_cloud.signin.submit.error.not_authorized',
}

const forgotFields = [
	{
		id       : 'forgot-username',
		name     : 'username',
		type     : 'text',
		labelKey : 'ui.sb_cloud.forgot.username.label',
		validate : (value) => {
			if (!value) {
				return 'blank'
			}
			return null
		},
		validateOnBlur : true,
		errorKeys      : {
			blank : 'ui.sb_cloud.forgot.username.error.blank',
		},
	},
]
const forgotErrorKeys = {
	NETWORK        : 'ui.sb_cloud.forgot.submit.error.network',
	SERVER         : 'ui.sb_cloud.forgot.submit.error.server',
	UNHADLED       : 'ui.sb_cloud.forgot.submit.error.unhandled',
	USER_NOT_FOUND : 'ui.sb_cloud.forgot.submit.error.user_not_found',
}
class StrawbeesCloudSignin extends React.Component {
	state = {
		signinDisabled       : false,
		forgotDisabled       : false,
		displayForgot        : false,
		displayForgotSuccess : false,
	}

	getSigninFormApi = (api) => {
		this.signinFormApi = api
	}

	onSigninSubmit = async (values) => {
		if (this.signinSubmitting) {
			return
		}
		this.signinSubmitting = true
		this.setState({ signinDisabled : true })
		try {
			await this.props.authenticateUser(values)
		} catch (error) {
			this.signinFormApi.setError('_form_error_', error.message)
		}

		// add a safe delay (submit is being called twice when clicking on the
		// submit button). This delay acts as a debunce, but easier to handle
		await new Promise(r => setTimeout(r, 200))
		this.signinSubmitting = false
		this.setState({ signinDisabled : false })
	}

	getForgotFormApi = (api) => {
		this.forgotFormApi = api
	}

	onForgotSubmit = async (values) => {
		if (this.forgotSubmitting) {
			return
		}
		this.forgotSubmitting = true
		this.setState({ forgotDisabled : true })
		try {
			await this.props.requestPasswordReset(values)
			this.setState({
				displayForgotSuccess : true,
				displayForgot        : false,
			})
			setTimeout(() => this.setState({ displayForgotSuccess : false }), 5000)
		} catch (error) {
			this.forgotFormApi.setError('_form_error_', error.message)
		}

		// add a safe delay (submit is being called twice when clicking on the
		// submit button). This delay acts as a debunce, but easier to handle
		await new Promise(r => setTimeout(r, 200))
		this.forgotSubmitting = false
		this.setState({ forgotDisabled : false })
	}

	toggleForgotForm = () => {
		this.setState({ displayForgot : !this.state.displayForgot })
	}

	render() {
		const {
			getSigninFormApi,
			onSigninSubmit,
			getForgotFormApi,
			onForgotSubmit,
			toggleForgotForm,
		} = this
		const {
			signinDisabled,
			forgotDisabled,
			displayForgot,
			displayForgotSuccess,
		} = this.state
		return (
			<div className='root strawbeesCloudSignin'>
				<style jsx>{`
					.root {
						display: flex;
						flex-direction: column;
						justify-content: center;
						position: relative;
					}
					.forgot {
						margin-top: 0.5rem;
						border-top: solid 1px ${tinycolor(GRAY).toRgbString()};
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
						position: relative;
					}
					.forgot :global(.iconButton) {
						margin-top: 0.5rem;
						margin-bottom: 0.25rem;
					}
					.forgot :global(.form) {
						margin-top: 0.5rem;
						align-self: stretch;
					}
					.forgot :global(.message) {
						margin-top: 0.5rem;
						max-width: 25rem;
					}
				`}</style>
				<Form
					submitLabelKey='ui.sb_cloud.signin.submit'
					errorKeys={signinErrorKeys}
					fields={signinFields}
					getApi={getSigninFormApi}
					onSubmit={onSigninSubmit}
					disabled={signinDisabled}
				/>
				<div className='forgot'>
					{!displayForgotSuccess &&
						<React.Fragment>
							<IconButton
								labelKey='ui.sb_cloud.forgot.title'
								onClick={toggleForgotForm}
								bgColor={GRAY}
								bgHoverColor={GRAY}
								textColor={WHITE}
								textHoverColor={WHITE}
							/>
							{displayForgot &&
								<Form
									submitLabelKey='ui.sb_cloud.forgot.submit'
									errorKeys={forgotErrorKeys}
									fields={forgotFields}
									getApi={getForgotFormApi}
									onSubmit={onForgotSubmit}
									disabled={forgotDisabled}
								/>
							}
						</React.Fragment>
					}
					{displayForgotSuccess &&
						<Message type='success'>
							<S value='ui.sb_cloud.forgot.submit.success'/>
						</Message>

					}
				</div>
			</div>
		)
	}
}

StrawbeesCloudSignin.propTypes = {
	authenticateUser     : PropTypes.func,
	requestPasswordReset : PropTypes.func,
}

export default StrawbeesCloudSignin

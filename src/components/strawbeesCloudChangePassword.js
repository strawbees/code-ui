import React from 'react'
import PropTypes from 'prop-types'
import Form from 'src/components/form'
import Message from 'src/components/message'
import S from 'src/containers/sManager'

const fields = [
	{
		id       : 'signup-password',
		name     : 'password',
		type     : 'password',
		labelKey : 'ui.sb_cloud.change_password.password.label',
		notify   : ['password-confirm'],
		validate : (value) => {
			if (!value) {
				return 'blank'
			}
			if (!value || value.length < 6) {
				return 'short'
			}
			return undefined
		},
		// validateOnBlur : true,
		errorKeys : {
			blank : 'ui.sb_cloud.change_password.password.error.blank',
			short : 'ui.sb_cloud.change_password.password.error.short',
		},
	},
	{
		id       : 'signup-password-confirm',
		name     : 'password-confirm',
		type     : 'password',
		labelKey : 'ui.sb_cloud.change_password.password_confirm.label',
		notify   : ['password'],
		validate : (value, values) => {
			if (!value) {
				return 'blank'
			}
			if (values.password !== values['password-confirm']) {
				return 'missmatch'
			}
			return undefined
		},
		// validateOnBlur : true,
		errorKeys : {
			blank     : 'ui.sb_cloud.change_password.password_confirm.error.blank',
			missmatch : 'ui.sb_cloud.change_password.password_confirm.error.missmatch',
		},
	},
]

const errorKeys = {
	NETWORK          : 'ui.sb_cloud.change_password.submit.error.network',
	SERVER           : 'ui.sb_cloud.change_password.submit.error.server',
	UNHADLED         : 'ui.sb_cloud.change_password.submit.error.unhandled',
	USER_UPDATE      : 'ui.sb_cloud.change_password.username.error.unhandled',
	ENCRYPT_PASSWORD : 'ui.sb_cloud.change_password.username.error.unhandled',
}
class StrawbeesCloudChangePassword extends React.Component {
	state = {
		displaySuccess : false,
		disabled       : false,
	}

	getFormApi = (api) => {
		this.formApi = api
	}

	onSubmit = async (values) => {
		if (this.submitting) {
			return
		}
		this.submitting = true
		this.setState({ disabled : true })
		try {
			await this.props.onSubmit(values)
			// safe check in case the component has been unmounted meanwhile
			if (this.unmounted) {
				return
			}
			this.setState({ displaySuccess : true })
		} catch (error) {
			this.formApi.setError('_form_error_', error.message)
		}

		// add a safe delay (submit is being called twice when clicking on the
		// submit button). This delay acts as a debunce, but easier to handle
		await new Promise(r => setTimeout(r, 200))
		this.submitting = false
		this.setState({ disabled : false })
	}

	componentWillUnmount() {
		// add this flag so we can exit early, the submit methods.
		// yeah, this is code smell... but works
		this.unmounted = true
	}

	render() {
		const {
			getFormApi,
			onSubmit,
		} = this
		const {
			displaySuccess,
			disabled,
		} = this.state
		return (
			<div className='root strawbeesCloudChangePassword'>
				<style jsx>{`
					.root {
						display: flex;
						flex-direction: column;
						justify-content: center;
						position: relative;
					}
				`}</style>
				{!displaySuccess &&
					<Form
						submitLabelKey='ui.sb_cloud.change_password.submit'
						errorKeys={errorKeys}
						fields={fields}
						getApi={getFormApi}
						onSubmit={onSubmit}
						disabled={disabled}
					/>
				}
				{displaySuccess &&
					<Message type='success'>
						<S value='ui.sb_cloud.change_password.submit.success'/>
					</Message>
				}
			</div>
		)
	}
}

StrawbeesCloudChangePassword.propTypes = {
	onSubmit : PropTypes.func
}

export default StrawbeesCloudChangePassword

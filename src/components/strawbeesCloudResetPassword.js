import React from 'react'
import PropTypes from 'prop-types'
import Form from 'src/components/form'
import Message from 'src/components/message'
import S from 'src/containers/sManager'

const fields = [
	{
		id       : 'new-password',
		name     : 'password',
		type     : 'password',
		labelKey : 'ui.sb_cloud.reset_password.password.label',
		validate : (value) => {
			if (!value) {
				return 'blank'
			}
			if (!value || value.length < 6) {
				return 'short'
			}
			return undefined
		},
		errorKeys : {
			blank : 'ui.sb_cloud.reset_password.password.error.blank',
			short : 'ui.sb_cloud.reset_password.password.error.short',
		},
	},
]

const errorKeys = {
	NETWORK                 : 'ui.sb_cloud.reset_password.submit.error.network',
	SERVER                  : 'ui.sb_cloud.reset_password.submit.error.server',
	UNHADLED                : 'ui.sb_cloud.reset_password.submit.error.unhandled',
	RESET_PASSWORD          : 'ui.sb_cloud.reset_password.submit.error.unhandled',
	RESET_REQUEST_NOT_FOUND : 'ui.sb_cloud.reset_password.submit.error.invalid_link',
	ENCRYPT_PASSWORD        : 'ui.sb_cloud.reset_password.submit.error.unhandled',
	USER_UPDATE             : 'ui.sb_cloud.reset_password.submit.error.unhandled',
}
class StrawbeesCloudResetPassword extends React.Component {
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
			this.successTimer = window.setInterval(() => {
				this.setState({ displaySuccess : false })
			}, 5000)
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
		window.clearInterval(this.successTimer)
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
			<div className='root strawbeesCloudResetPassword'>
				<style jsx>{`
					.root {
						display: flex;
						flex-direction: column;
						justify-content: center;
						position: relative;
					}
				`}</style>
				<div className='form-title global-type-h3'>
					<S value='ui.sb_cloud.reset_password.submit'/>
				</div>
				{!displaySuccess &&
					<Form
						submitLabelKey='ui.sb_cloud.reset_password.submit'
						errorKeys={errorKeys}
						fields={fields}
						getApi={getFormApi}
						onSubmit={onSubmit}
						disabled={disabled}
					/>
				}
				{displaySuccess &&
					<Message type='success'>
						<S value='ui.sb_cloud.reset_password.submit.success'/>
					</Message>
				}
			</div>
		)
	}
}

StrawbeesCloudResetPassword.propTypes = {
	onSubmit : PropTypes.func,
}

export default StrawbeesCloudResetPassword

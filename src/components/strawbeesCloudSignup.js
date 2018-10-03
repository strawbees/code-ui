import React from 'react'
import PropTypes from 'prop-types'
import Form from 'src/components/form'

const fields = [
	{
		id       : 'signup-age',
		name     : 'age',
		type     : 'number',
		labelKey : 'ui.sb_cloud.signup.age.label',
		tipKey   : 'ui.sb_cloud.signup.age.tip',
		validate : (value) => {
			if (!value) {
				return 'blank'
			}
			if (!value || value < 13) {
				return 'underAge'
			}
			return null
		},
		// validateOnBlur : true,
		errorKeys      : {
			blank    : 'ui.sb_cloud.signup.age.error.blank',
			underAge : 'ui.sb_cloud.signup.age.error.under',
		},
	},
	{
		id       : 'signup-username',
		name     : 'username',
		type     : 'text',
		labelKey : 'ui.sb_cloud.signup.username.label',
		tipKey   : 'ui.sb_cloud.signup.username.tip',
		validate : (value) => {
			if (!value) {
				return 'blank'
			}
			if (value.length > 30) {
				return 'too-long'
			}
			const match = value.match(/[a-zA-Z0-9-_]*/)
			if (value !== match[0]) {
				return 'invalid'
			}
			return null
		},
		// validateOnBlur : true,
		errorKeys      : {
			blank      : 'ui.sb_cloud.signup.username.error.blank',
			'too-long' : 'ui.sb_cloud.signup.username.error.too_long',
			invalid    : 'ui.sb_cloud.signup.username.error.invalid',
			unique     : 'ui.sb_cloud.signup.username.error.unique',
		},
	},
	{
		id       : 'signup-email',
		name     : 'email',
		type     : 'email',
		labelKey : 'ui.sb_cloud.signup.email.label',
		tipKey   : 'ui.sb_cloud.signup.email.tip',
		validate : (value) => {
			if (!value) {
				return 'blank'
			}
			if (value.indexOf('@') < 1) {
				return 'invalid'
			}
			return null
		},
		// validateOnBlur : true,
		errorKeys      : {
			blank   : 'ui.sb_cloud.signup.email.error.blank',
			invalid : 'ui.sb_cloud.signup.email.error.invalid',
		},
	},
	// {
	// 	id       : 'signup-email-confirm',
	// 	name     : 'email-confirm',
	// 	type     : 'email',
	// 	labelKey : 'ui.sb_cloud.signup.email_confirm.label',
	// 	validate : (value, values) => {
	// 		if (!value) {
	// 			return 'blank'
	// 		}
	// 		if (values.email !== values['email-confirm']) {
	// 			return 'missmatch'
	// 		}
	// 		return null
	// 	},
	//	// validateOnBlur : true,
	// 	errorKeys      : {
	// 		blank     : 'ui.sb_cloud.signup.email_confirm.error.blank',
	// 		missmatch : 'ui.sb_cloud.signup.email_confirm.error.missmatch',
	// 	},
	// },
	{
		id       : 'signup-password',
		name     : 'password',
		type     : 'password',
		labelKey : 'ui.sb_cloud.signup.password.label',
		// notify   : ['password-confirm'],
		validate : (value) => {
			if (!value) {
				return 'blank'
			}
			if (!value || value.length < 6) {
				return 'short'
			}
			return null
		},
		// validateOnBlur : true,
		errorKeys      : {
			blank : 'ui.sb_cloud.signup.password.error.blank',
			short : 'ui.sb_cloud.signup.password.error.short',
		},
	},
	// {
	// 	id       : 'signup-password-confirm',
	// 	name     : 'password-confirm',
	// 	type     : 'password',
	// 	labelKey : 'ui.sb_cloud.signup.password_confirm.label',
	// 	notify   : ['password'],
	// 	validate : (value, values) => {
	// 		if (!value) {
	// 			return 'blank'
	// 		}
	// 		if (values.password !== values['password-confirm']) {
	// 			return 'missmatch'
	// 		}
	// 		return null
	// 	},
	// 	// validateOnBlur : true,
	// 	errorKeys      : {
	// 		blank     : 'ui.sb_cloud.signup.password_confirm.error.blank',
	// 		missmatch : 'ui.sb_cloud.signup.password_confirm.error.missmatch',
	// 	},
	// },
	{
		id            : 'signup-terms',
		name          : 'terms',
		type          : 'checkbox',
		labelKey      : 'ui.sb_cloud.signup.terms.label',
		tipKey        : 'ui.sb_cloud.signup.terms.tip',
		tipIsMarkdown : true,
		validate      : (value) => {
			if (!value) {
				return 'agree'
			}
			return null
		},
		// validateOnBlur : true,
		errorKeys      : {
			agree : 'ui.sb_cloud.signup.terms.error.agree',
		},
	}
]

const errorKeys = {
	NETWORK                    : 'ui.sb_cloud.signup.submit.error.network',
	SERVER                     : 'ui.sb_cloud.signup.submit.error.server',
	UNHADLED                   : 'ui.sb_cloud.signup.submit.error.unhandled',
	VALIDATION_UNIQUE_USERNAME : 'ui.sb_cloud.signup.username.error.unique',
}
class StrawbeesCloudSignup extends React.Component {
	state = {
		disabled : false
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
			await this.props.onSignup(values)
			// safe check in case the component has been unmounted meanwhile
			if (this.unmounted) {
				return
			}
		} catch (error) {
			if (error.message === 'VALIDATION_UNIQUE_USERNAME') {
				this.formApi.setError('username', 'unique')
			} else {
				this.formApi.setError('_form_error_', error.message)
			}
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
			onPreSubmit,
			onSubmit,
		} = this
		const {
			disabled
		} = this.state
		return (
			<div className='root strawbeesCloudSignup'>
				<style jsx>{`
					.root {
						display: flex;
						flex-direction: column;
						justify-content: center;
						position: relative;
					}
				`}</style>
				<Form
					submitLabelKey='ui.sb_cloud.signup.submit'
					errorKeys={errorKeys}
					fields={fields}
					getApi={getFormApi}
					onSubmit={onSubmit}
					onPreSubmit={onPreSubmit}
					disabled={disabled}
				/>
			</div>
		)
	}
}

StrawbeesCloudSignup.propTypes = {
	onSignup : PropTypes.func
}

export default StrawbeesCloudSignup

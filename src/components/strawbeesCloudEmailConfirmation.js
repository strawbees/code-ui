import React from 'react'
import PropTypes from 'prop-types'
import Message from 'src/components/message'
import Spinner from 'src/components/spinner'
import S from 'src/containers/sManager'

const errorKeys = {
	NETWORK     : 'ui.sb_cloud.confirm_email.submit.error.network',
	SERVER      : 'ui.sb_cloud.confirm_email.submit.error.server',
	UNHADLED    : 'ui.sb_cloud.confirm_email.submit.error.unhandled',
	USER_UPDATE : 'ui.sb_cloud.confirm_email.submit.error.invalid_link',
}
class StrawbeesCloudEmailConfirmation extends React.Component {
	state = {
		loading  : true,
		success  : false,
		errorKey : null,
	}

	onSubmit = async () => {
		if (this.submitting) {
			return
		}
		this.submitting = true
		this.setState({ loading : true })
		try {
			await this.props.onSubmit()
			// safe check in case the component has been unmounted meanwhile
			if (this.unmounted) {
				return
			}
			this.setState({ success : true })
		} catch (error) {
			this.setState({
				success  : false,
				errorKey : errorKeys[error.message] || errorKeys.UNHADLED,
			})
		}

		// add a safe delay (submit is being called twice when clicking on the
		// submit button). This delay acts as a debunce, but easier to handle
		await new Promise(r => setTimeout(r, 200))
		this.submitting = false
		this.setState({ loading : false })
	}

	componentDidUpdate() {
		if (this.props.onSubmit && !this.submited) {
			this.submited = true
			this.onSubmit()
		}
	}

	componentWillUnmount() {
		// add this flag so we can exit early, the submit methods.
		// yeah, this is code smell... but works
		this.unmounted = true
	}

	render() {
		const {
			loading,
			success,
			errorKey,
		} = this.state
		return (
			<div className='root strawbeesCloudEmailConfirmation'>
				<style jsx>{`
					.root {
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						position: relative;
					}
				`}</style>
				<div className='form-title global-type-h3'>
					<S value='ui.sb_cloud.confirm_email.title'/>
				</div>
				{loading &&
					<Spinner />
				}
				{!loading && success &&
					<Message type='success'>
						<S value='ui.sb_cloud.confirm_email.submit.success'/>
					</Message>
				}
				{!loading && !success &&
					<Message type='error'>
						<S value={errorKey}/>
					</Message>
				}
			</div>
		)
	}
}

StrawbeesCloudEmailConfirmation.propTypes = {
	onSubmit : PropTypes.func,
}

export default StrawbeesCloudEmailConfirmation

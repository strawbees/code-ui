import React from 'react'
import { Form as Informed, Text, Checkbox } from 'informed'
import PropTypes from 'prop-types'
import tinycolor from 'tinycolor2'
import Message from 'src/components/message'
import Spinner from 'src/components/spinner'
import IconButton from 'src/components/iconButton'
import S from 'src/containers/sManager'
import {
	GRAY,
	BLACK,
	RED,
	WHITE,
	GREEN,
} from 'src/constants/colors'

class Form extends React.Component {
	state = {}

	render() {
		const {
			formId,
			submitLabelKey,
			fields,
			errorKeys,
			onSubmit,
			onPreSubmit,
			getApi,
			disabled,
		} = this.props
		return (
			<div className='root form'>
				<style jsx>{`
					.root {
						display: flex;
						flex-direction: column;
						align-items: stretch;
						position: relative;
					}
					.root :global(form){
						display: flex;
						flex-direction: column;
						align-items: stretch;
					}
					.root :global(form .submit-area){
						margin-top: 0.5rem;
						display: flex;
						flex-direction: row;
						align-items: center;
						justify-content: flex-end;
					}
					.root :global(form .submit-area .error){
						align-self: flex-end;
						flex-grow: 1;
						margin-right: 1rem;
					}
					.root :global(.field) {
						display: flex;
						flex-direction: column;
						padding-bottom: 0.5rem;
						border-bottom: solid 1px ${tinycolor(GRAY).lighten(30).toRgbString()};
					}
					.root :global(.field .label) {
						font-size: 0.8rem;
						font-weight: bold;
					}
					.root :global(.field .tip) {
						font-size: 0.8rem;
						color: ${tinycolor(GRAY).toRgbString()};
					}
					.root :global(.field input:not([type=checkbox])) {
						-webkit-appearance: none;
						border: none;
						border-radius: 0.2rem;
						background-color: ${tinycolor(GRAY).lighten(25).toRgbString()};
						color: ${tinycolor(BLACK).toRgbString()};
						font-size: 1rem;
						font-family: Text;
						padding: 0 0.2rem;
						height: 2rem;
					}
					.root :global(.field input:not([type=checkbox]):focus) {
						outline: none;
						background-color: ${tinycolor(GRAY).lighten(35).toRgbString()};
					}
					.root :global(.field .checkbox-container) {
						display: flex;
						flex-direction: row;
						align-items: center;
					}
					.root :global(.field .checkbox-container input[type=checkbox]) {
						margin-right: 0.5rem;
					}
					.root :global(.field .checkbox-container .tip p) {
						margin: 0;
					}
					.root :global(.field .error) {
						margin-top: 0.5rem;
						max-width: 25rem;
						align-self: center;
					}
					.root :global(.field.error .label){
						color: ${tinycolor(RED).toRgbString()};
					}
					.root .blocker {
						position: absolute;
						top: 0;
						left: 0;
						bottom: 0;
						right: 0;
						background-color: ${tinycolor(WHITE).setAlpha(0.8).toRgbString()};
						display: flex;
						flex-direction: row;
						align-items: center;
						justify-content: center;
					}
				`}</style>
				<Informed
					id={formId}
					onSubmit={onSubmit}
					preSubmit={onPreSubmit}
					getApi={getApi}>
					{({ formState, formApi }) => (
						<React.Fragment>
							{fields.map(field => {
								const error = field.errorKeys &&
									formState.errors &&
									formState.errors[field.name] &&
									field.errorKeys[formState.errors[field.name]]

								return (
									<div className={`field ${error ? 'error' : ''}`} key={field.id}>
										{field.labelKey &&
											<label className='label' htmlFor={field.id}>
												<S value={field.labelKey} />
											</label>
										}
										{(field.tipKey && field.type !== 'checkbox') &&
											<div className='tip'>
												<S value={field.tipKey} />
											</div>
										}
										{(
											field.type === 'text' ||
											field.type === 'number' ||
											field.type === 'password' ||
											field.type === 'email') &&
											<Text
												type={field.type}
												field={field.name}
												validateOnChange={field.validateOnChange}
												validateOnBlur={field.validateOnBlur}
												validate={field.validate}
												notify={field.notify}
												id={field.id}
											/>
										}
										{field.type === 'checkbox' &&
											<div className='checkbox-container'>
												<Checkbox
													type={field.type }
													field={field.name}
													validateOnChange={field.validateOnChange}
													validateOnBlur={field.validateOnBlur}
													validate={field.validate}
													notify={field.notify}
													id={field.id}
												/>
												{field.tipKey &&
													<label htmlFor={field.id}>
														<div className='tip'>
															<S
																value={field.tipKey}
																markdown={field.tipIsMarkdown}
															/>
														</div>
													</label>
												}
											</div>
										}
										{error &&
											<Message className='error' type='warning'>
												<S value={error} />
											</Message>
										}
									</div>
								)
							})}
							<div className='submit-area'>
								{/* this invisible _form_error_ field, is a hack
								  * so we can attach "global" errors to the form
								  * that don't belong to any other field (eg: network error)
							 	*/}
								<Text
									type='text'
									field='_form_error_'
									style={{ display : 'none' }}
								/>
								{/* eslint-disable no-underscore-dangle */
									errorKeys &&
									formState.errors &&
									formState.errors._form_error_ &&
									errorKeys[formState.errors._form_error_] &&
									<Message className='error' type='warning'>
										<S value={errorKeys[formState.errors._form_error_]} />
									</Message>
								/* eslint-enable no-underscore-dangle */}
								<IconButton
									className='submit'
									labelKey={submitLabelKey}
									onClick={() => formApi.submitForm()}
									bgColor={GREEN}
									bgHoverColor={GREEN}
									textColor={WHITE}
									textHoverColor={WHITE}
								/>
							</div>
						</React.Fragment>
					)}
				</Informed>
				{disabled &&
					<div className='blocker'>
						<Spinner scale={2}/>
					</div>
				}
			</div>
		)
	}
}

Form.defaultProps = {
	submitLabelKey : 'ui.form.submit',
	fields         : []
}

Form.propTypes = {
	formId         : PropTypes.string,
	submitLabelKey : PropTypes.string,
	errorKeys      : PropTypes.object,
	onSubmit       : PropTypes.func,
	onPreSubmit    : PropTypes.func,
	getApi         : PropTypes.func,
	disabled       : PropTypes.bool,
	fields         : PropTypes.arrayOf(PropTypes.shape({
		type : PropTypes.oneOf([
			'text',
			'number',
			'email',
			'password',
			'checkbox'
		]),
		id               : PropTypes.string,
		name             : PropTypes.string,
		labelKey         : PropTypes.string,
		tipKey           : PropTypes.string,
		tipIsMarkdown    : PropTypes.bool,
		validate         : PropTypes.func,
		validateOnBlur   : PropTypes.bool,
		validateOnChange : PropTypes.bool,
		notify           : PropTypes.arrayOf(PropTypes.string),
		errorKeys        : PropTypes.object,
	}))
}

export default Form

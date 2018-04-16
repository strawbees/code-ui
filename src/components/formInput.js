import React from 'react'
import PropTypes from 'prop-types'
import S from 'src/containers/sContainer'

class FormInput extends React.Component {
	state = {}

	render() {
		const {
			labelKey,
			placeholderKey,
			defaultValue,
			onChange
		} = this.props
		return (
			<div className='root formInput'>
				<style jsx>{`
					.buttons {
						display: flex;
						flex-direction: column;
					}
				`}</style>
				{labelKey &&
					<div className='label'>
						<S value={labelKey} />
					</div>
				}
				<input
					type='text'
					defaultValue={defaultValue}
					placeholder={this.state.placeholder || ''}
					onChange={(e) => onChange && onChange(e.target.value)}
				/>
				{placeholderKey &&
					<S
						value={placeholderKey}
						render={false}
						onChange={placeholder => this.setState({ placeholder })}
					/>
				}
			</div>
		)
	}
}

FormInput.defaultProps = {}

FormInput.propTypes = {
	labelKey       : PropTypes.string,
	placeholderKey : PropTypes.string,
	defaultValue   : PropTypes.string,
	onChange       : PropTypes.func,
}

export default FormInput

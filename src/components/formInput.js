import React from 'react'
import PropTypes from 'prop-types'
import tinycolor from 'tinycolor2'
import S from 'src/containers/sManager'
import {
	GRAY,
	BLACK,
} from 'src/constants/colors'

class FormInput extends React.Component {
	state = {}

	render() {
		const {
			labelKey,
			labelValue,
			placeholderKey,
			defaultValue,
			onChange
		} = this.props
		return (
			<div className='root formInput'>
				<style jsx>{`
					.root {
						display: flex;
						flex-direction: column;
						position: relative;
					}
					.label {
						font-size: 0.8rem;
						font-weight: bold;
					}
					input {
						-webkit-appearance: none;
						border: none;
						border-radius: 0.2rem;
						background-color: ${tinycolor(GRAY).lighten(25).toRgbString()};
						color: ${tinycolor(BLACK).toRgbString()};
						font-size: 1rem;
						font-family: Text;
						padding: 0 0.2rem;
						height: 2rem;
						margin-right: 0.5rem;
					}
					input:focus {
						outline: none;
						background-color: ${tinycolor(GRAY).lighten(35).toRgbString()};
					}
				`}</style>
				{labelKey && !labelValue &&
					<div className='label'>
						<S value={labelKey} />
					</div>
				}
				{labelValue &&
					<div className='label'>
						{labelValue}
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

FormInput.propTypes = {
	labelKey       : PropTypes.string,
	labelValue     : PropTypes.string,
	placeholderKey : PropTypes.string,
	defaultValue   : PropTypes.string,
	onChange       : PropTypes.func,
}

export default FormInput

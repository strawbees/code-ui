import React from 'react'
import PropTypes from 'prop-types'
import tinycolor from 'tinycolor2'
import StrawbeesCloudResetPassword from 'src/components/strawbeesCloudResetPassword'
import {
	GRAY,
	WHITE
} from 'src/constants/colors'

const PagePasswordReset = ({
	onSubmit
}) =>
	<div className='root pagePasswordReset'>
		<style jsx>{`
			.root {
				background-color: ${tinycolor(GRAY).lighten(25).toRgbString()};
				padding: 1rem;
				flex: 1;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				overflow: auto;
				min-height: min-content;
				overscroll-behavior: none;
			}
			.container {
				display: block;
				box-sizing: border-box;
				width: 25rem;
				background-color: ${WHITE};
				padding: 1rem;
				border-radius: 1rem;
			}
			@media (max-width: 450px) {
				.root {
					padding: 0;
				}
				.root .container {
					border-radius: 0;
					width: 100%;
				}
			}
		`}</style>
		<div className='container'>
			<StrawbeesCloudResetPassword
				onSubmit={onSubmit}
			/>
		</div>
	</div>

PagePasswordReset.propTypes = {
	onSubmit : PropTypes.func,
}

export default PagePasswordReset

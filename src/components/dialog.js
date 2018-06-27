import React from 'react'
import PropTypes from 'prop-types'
import tinycolor from 'tinycolor2'
import IconButton from 'src/components/iconButton'
import {
	WHITE,
	GREEN,
	RED
} from 'src/constants/colors'

const Dialog = ({
	children,
	titleLabel,
	displayConfirm,
	displayCancel,
	confirmLabel,
	cancelLabel,
	onConfirm,
	onCancel
}) =>
	<div className='root dialog'>
		<style jsx>{`
			.root {
				display: flex;
				flex-direction: column;
			}
			.buttons {
				display: flex;
				flex-direction: row;
				justify-content: flex-end;
				align-self: flex-end;
			}
			.buttons :global(.iconButton) {
				margin-top: 1rem;
				margin-right: 0.5rem;
			}
			.buttons :global(.iconButton:last-child) {
				margin-right: 0;
			}
		`}</style>
		{titleLabel &&
			<div className='title global-type global-type-h3'>
				{titleLabel}
			</div>
		}
		{children}
		{(displayCancel || displayConfirm) &&
			<div className='buttons'>
				{displayCancel &&
					<IconButton
						className='cancel'
						label={cancelLabel}
						onClick={onCancel}
						textColor={WHITE}
						textHoverColor={WHITE}
						bgColor={RED}
						bgHoverColor={RED}
					/>
				}
				{displayConfirm &&
					<IconButton
						className='confirm'
						label={confirmLabel}
						onClick={onConfirm}
						textColor={WHITE}
						textHoverColor={WHITE}
						bgColor={GREEN}
						bgHoverColor={GREEN}
					/>
				}
			</div>
		}
	</div>

Dialog.defaultProps = {
	displayConfirm : true,
	displayCancel  : true
}

Dialog.propTypes = {
	children : PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element
	]),
	titleLabel     : PropTypes.string,
	displayConfirm : PropTypes.bool,
	displayCancel  : PropTypes.bool,
	confirmLabel   : PropTypes.string,
	cancelLabel    : PropTypes.string,
	onConfirm      : PropTypes.func,
	onCancel       : PropTypes.func,
}

export default Dialog

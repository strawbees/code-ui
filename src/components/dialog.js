import React from 'react'
import PropTypes from 'prop-types'

const Dialog = ({
	children,
	displayConfirm,
	displayCancel,
	confirmLabel,
	cancelLabel,
	onConfirm,
	onCancel
}) =>
	<div className='root dialog'>
		<style jsx>{`
			.buttons {
				display: flex;
				flex-direction: row;
			}
		`}</style>
		{children}
		{(displayCancel || displayConfirm) &&
			<div className='buttons'>
				{displayCancel &&
					<div onClick={onCancel}>
						{cancelLabel}
					</div>
				}
				{displayConfirm &&
					<div onClick={onConfirm}>
						{confirmLabel}
					</div>
				}
			</div>
		}
	</div>

Dialog.defaultProps = {}

Dialog.propTypes = {
	children : PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element
	]),
	displayConfirm : PropTypes.bool,
	displayCancel  : PropTypes.bool,
	confirmLabel   : PropTypes.string,
	cancelLabel    : PropTypes.string,
	onConfirm      : PropTypes.func,
	onCance        : PropTypes.func,
}

export default Dialog

import React from 'react'
import PropTypes from 'prop-types'
import IconButton from 'src/components/iconButton'
import S from 'src/containers/sManager'
import {
	WHITE,
	GREEN,
	RED
} from 'src/constants/colors'

const Dialog = ({
	children,
	titleKey,
	descriptionKey,
	cancelLabelKey,
	confirmLabelKey,
	descriptionIsMarkdown,
	displayConfirm,
	displayCancel,
	onConfirm,
	onCancel,
	limitWidth,
}) =>
	<div className='root dialog'>
		<style jsx>{`
			.root {
				display: flex;
				flex-direction: column;
				${limitWidth ? 'width: 25rem;' : ''}
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
			@media (max-width: 480px) {
				.root {
					width: 100%;
				}
			}
		`}</style>
		{titleKey &&
			<div className='title global-type global-type-h3'>
				<S value={titleKey} />
			</div>
		}
		{descriptionKey &&
			<div className='description global-type'>
				<S value={descriptionKey} markdown={descriptionIsMarkdown} />
			</div>
		}
		{children}
		{(displayCancel || displayConfirm) &&
			<div className='buttons'>
				{displayCancel &&
					<IconButton
						className='cancel'
						labelKey={cancelLabelKey || 'ui.buttons.cancel'}
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
						labelKey={confirmLabelKey || 'ui.buttons.confirm'}
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
	displayConfirm        : true,
	displayCancel         : true,
	descriptionIsMarkdown : true,
}

Dialog.propTypes = {
	children : PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element
	]),
	titleKey              : PropTypes.string,
	descriptionKey        : PropTypes.string,
	cancelLabelKey        : PropTypes.string,
	confirmLabelKey       : PropTypes.string,
	descriptionIsMarkdown : PropTypes.bool,
	displayConfirm        : PropTypes.bool,
	displayCancel         : PropTypes.bool,
	onConfirm             : PropTypes.func,
	onCancel              : PropTypes.func,
	limitWidth            : PropTypes.bool,
}

export default Dialog

import PropTypes from 'prop-types'
import ReactModal from 'react-modal'
import tinycolor from 'tinycolor2'
import IconButton from 'src/components/iconButton'
import closeIcon from 'src/assets/icons/general/close.svg'
import {
	GRAY,
	RED,
	WHITE,
} from 'src/constants/colors'

if (process.browser) {
	ReactModal.setAppElement('#__next')
}

const Modal = ({
	display,
	content,
	onRequestClose
}) =>
	<ReactModal
		isOpen={display}
		onRequestClose={onRequestClose}
		shouldCloseOnOverlayClick={false}>
		<style jsx>{`
			:global(.ReactModal__Overlay){
				display: flex !important;
				flex-direction: row !important;
				align-items: center !important;
				justify-content: center !important;
				background-color: ${tinycolor(GRAY).setAlpha(0.5)} !important;
			}
			:global(.ReactModal__Content){
				position: relative !important;
				top: auto !important;
				left: auto !important;
				bottom: auto !important;
				right: auto !important;
				padding: 1rem 1.5rem !important;
				border: none !important;
				border-radius: 1rem !important;
			}
			:global(.ReactModal__Content) :global(>.close) {
				position: absolute;
				top: 0rem;
				right: 0rem;
				z-index: 1;
				transform: scale3d(0.7,0.7,0.7);
			}
			:global(.ReactModal__Content) :global(>.content) {
				position: relative;
				max-height: calc(100vh - 4rem);
				max-width: calc(100vw - 4rem);
				min-width: calc(400px - 4rem);
				min-height: calc(150px - 4rem);
				overflow-y: auto;
			}
			@media (max-width: 400px) {
				:global(.ReactModal__Content) :global(>.content) {
					min-width: 0;
					width: calc(100vw - 4rem);
				}
			}
			@media (max-height : 200px) {
				:global(.ReactModal__Content) :global(>.content) {
					min-height: 0;
					height: calc(100vh - 4rem);
				}
			}
		`}</style>
		<IconButton
			className='close'
			icon={closeIcon}
			textColor={WHITE}
			textHoverColor={WHITE}
			bgColor={RED}
			bgHoverColor={RED}
			onClick={onRequestClose}
		/>
		<div className="content">
			{content}
		</div>
	</ReactModal>

Modal.propTypes = {
	display        : PropTypes.bool,
	content        : PropTypes.element,
	onRequestClose : PropTypes.func
}

export default Modal

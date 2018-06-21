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

const LIGHT_GRAY = tinycolor(GRAY).lighten(20).toRgbString()

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
		onRequestClose={onRequestClose}>
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
				max-width: calc(100vw - 2rem) !important;
				min-width: calc(400px - 2rem) !important;
				max-height: calc(100vh - 2rem) !important;
				min-height: calc(200px - 2rem) !important;
				border: none !important;
				border-radius: 1rem !important;
			}
			@media (max-width: 400px) {
				:global(.ReactModal__Content){
					min-width: 0 !important;
					width: calc(100vw - 1rem);
				}
			}
			@media (max-height : 200px) {
				:global(.ReactModal__Content){
					min-height: 0 !important;
					height: calc(100vh - 1rem);
				}
			}
			:global(.ReactModal__Content) :global(>.close) {
				position: absolute;
				top: 0.5rem;
				right: 0.5rem;
				z-index: 1;
			}
		`}</style>
		<IconButton
			className='close'
			icon={closeIcon}
			textColor={WHITE}
			textHoverColor={WHITE}
			bgColor={LIGHT_GRAY}
			bgHoverColor={RED}
			borderColor={'transparent'}
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

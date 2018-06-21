import PropTypes from 'prop-types'
import tinycolor from 'tinycolor2'
import Spinner from 'src/components/spinner'
import SvgIcon from 'src/components/svgIcon'
import Message from 'src/components/message'
import IconButton from 'src/components/iconButton'
import SingleBoardStatusContainer from 'src/containers/singleBoardStatusContainer'
import S from 'src/containers/sManager'
import QuirkbotIllustration from 'src/assets/illustrations/quirkbotUploadIsometric.svg'
import generalIcons from 'src/assets/icons/general'
import {
	WHITE,
	YELLOW,
	GRAY,
	RED,
	GREEN
} from 'src/constants/colors'

const SingleBoardUploader = ({
	onUploadPress,
	runtimeId,
	// uuid,
	midi,
	// bootloader,
	uploading,
	hex,
	uploaderBusy,
	uploadSuccess,
	uploadError
}) => {
	let type
	if (midi) {
		// Board is midi compatible
		if (hex) {
			// There's a hex avaiable
			if (uploading) {
				// There's an ongoing upload
				type = 'UPLOADING'
			} else if (uploaderBusy) {
				// Uploader is busy
				type = 'BUSY'
			} else if (!uploadSuccess && !uploadError) {
				// Upload hasn't start yet
				type = 'IDDLE'
			} else if (uploadSuccess) {
				// Sucessful upload
				type = 'SUCCESS'
			} else {
				// Upload error
				type = 'ERROR'
			}
		} else {
			type = 'NO_HEX'
		}
	} else {
		type = 'UNAVAIABLE'
	}

	let statusIcon
	switch (type) {
		case 'UPLOADING':
			statusIcon = generalIcons.sync
			break
		case 'ERROR':
			statusIcon = generalIcons.error
			break
		case 'SUCCESS':
			statusIcon = generalIcons.check
			break
		default:
			statusIcon = null
	}

	return (
		<div className={`root singleBoardUploader ${type}`}>
			<style jsx>{`
				.container {
					display: flex;
					flex-direction: column;
					align-items: stretch;
					position: relative;
					padding: 0.5rem 1rem;
					border-radius: 0.5rem;
					height: 13rem;
				}
				.root.IDDLE .container,
				.root.UNAVAIABLE .container,
				.root.NO_HEX .container,
				.root.BUSY .container {
					background-color: ${tinycolor(GRAY).setAlpha(0.5).toRgbString()};
				}
				.root.UPLOADING .container {
					background-color: ${tinycolor(YELLOW).toRgbString()};
				}
				.root.SUCCESS .container {
					background-color: ${tinycolor(GREEN).setAlpha(0.75).toRgbString()};
				}
				.root.ERROR .container {
					background-color: ${tinycolor(RED).toRgbString()};
				}
				.container :global(.singleBoardStatus) {
					margin-left: -1rem;
				}
				.container :global(.illustration) {
					width: 100%;
					height: 11rem;
					position: absolute;
					bottom: 0;
					left: 0;
				}
				.container :global(.status) {
					position: absolute;
					bottom: 0;
					left: 0;
					fill: ${tinycolor(WHITE).toRgbString()};
					width: 50%;
					height: 100%;
				}
				.container :global(.disconnect-warning)  {
					position: absolute;
					bottom: 0.5rem;
					right: 0.5rem;
				}

				.container :global(.compilation-status){
					position: absolute;
					bottom: 0.5rem;
					right: 0.5rem;
					display: flex;
					flex-direction: row;
					align-items: center;
				}
				.container :global(.start-upload-button){
					position: absolute;
					bottom: 0.5rem;
					right: 0.5rem;
				}
				/* ANIMATIONS */
				.root.UPLOADING .container :global(.status)  {
					animation: spin-animation 2s linear infinite reverse;
				}
				@keyframes spin-animation {
					from {
						transform: rotateZ(0);
					}
					to {
						transform: rotateZ(360deg);
					}
				}
				.container :global(.illustration #line-cord)  {
					animation: line-cord-animation 0.5s linear infinite;
				}
				@keyframes line-cord-animation {
					from {
						stroke-dashoffset: 0;
					}
					to {
						stroke-dashoffset: -300;
					}
				}
				.container :global(.illustration #line-chip)  {
					animation: line-chip-animation 0.5s linear infinite;
				}
				@keyframes line-chip-animation {
					from {
						stroke-dashoffset: 0;
					}
					to {
						stroke-dashoffset: -130;
					}
				}
				.root:not(.UPLOADING) .container :global(.illustration #line-cord),
				.root:not(.UPLOADING) .container :global(.illustration #line-chip) {
					display: none;
				}
				.root:not(.UPLOADING):not(.SUCCESS) .container :global(.illustration #led-lm),
				.root:not(.UPLOADING):not(.SUCCESS) .container :global(.illustration #led-rm),
				.root:not(.UPLOADING):not(.SUCCESS) .container :global(.illustration #led-le),
				.root:not(.UPLOADING):not(.SUCCESS) .container :global(.illustration #led-re){
					display: none;
				}
				.root.UPLOADING .container :global(.illustration #led-lm)  {
					animation: led-blink-animation 0.1s linear infinite alternate;
				}
				.root.UPLOADING .container :global(.illustration #led-rm)  {
					animation: led-blink-animation 0.1s linear infinite alternate-reverse;;
				}
				.root.SUCCESS .container :global(.illustration #led-lm),
				.root.SUCCESS .container :global(.illustration #led-rm),
				.root.SUCCESS .container :global(.illustration #led-le),
				.root.SUCCESS .container :global(.illustration #led-re) {
					animation: led-blink-animation 0.3s linear infinite alternate;;
				}
				@keyframes led-blink-animation {
					from {
						opacity: 0;
					}
					to {
						opacity: 0.75;
					}
				}
				.root.UPLOADING .container :global(.illustration #led-le),
				.root.UPLOADING .container :global(.illustration #led-re) {
					display: none;
				}

			`}</style>
			<div className='container'>
				{statusIcon &&
					<SvgIcon
						icon={statusIcon}
						className='status'
					/>
				}
				<SvgIcon
					icon={QuirkbotIllustration}
					className='illustration'
				/>
				<SingleBoardStatusContainer
					runtimeId={runtimeId}
					labelKey={`ui.board.upload.status.${type}`}
					scale={1.25}
				/>
				{type === 'UNAVAIABLE' &&
					<S value='ui.board.upload.not_midi'/>
				}
				{type === 'UPLOADING' &&
					<Message type='error' className='disconnect-warning'>
						<S value='ui.board.upload.disconnect_warning'/>
					</Message>
				}
				{type === 'NO_HEX' &&
					<Message type='blank' className='compilation-status'>
						<Spinner/>
						<div>
							<S value='ui.board.upload.compiler.progress'/>
						</div>
					</Message>
				}
				{(type === 'IDDLE' || type === 'ERROR') &&
					<IconButton
						onClick={onUploadPress}
						labelKey='ui.board.upload.start'
						className='start-upload-button'
					/>
				}
			</div>
		</div>
	)
}

SingleBoardUploader.defaultProps = {
}

SingleBoardUploader.propTypes = {
	onUploadPress : PropTypes.func,
	runtimeId     : PropTypes.string,
	uuid          : PropTypes.string,
	midi          : PropTypes.bool,
	uploaderBusy  : PropTypes.bool,
	bootloader    : PropTypes.bool,
	uploading     : PropTypes.bool,
	hex           : PropTypes.string,
	uploadSuccess : PropTypes.bool,
	uploadError   : PropTypes.string,
}

export default SingleBoardUploader

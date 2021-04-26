import PropTypes from 'prop-types'
import tinycolor from 'tinycolor2'
import Spinner from 'src/components/spinner'
import SvgIcon from 'src/components/svgIcon'
import Message from 'src/components/message'
import IconButton from 'src/components/iconButton'
import SingleBoardStatusContainer from 'src/containers/singleBoardStatusContainer'
import S from 'src/containers/sManager'
import QuirkbotIllustration from 'src/assets/illustrations/quirkbotUploadIsometric.svg'
import uploadIcon from 'src/assets/icons/file/upload.svg'
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
	hardwareInterface,
	// uuid,
	midi,
	// bootloader,
	uploading,
	hex,
	hexes,
	uploaderBusy,
	uploadSuccess,
	uploadError
}) => {
	let type
	if (hardwareInterface === 'midi' && !midi) {
		// Board is not compatible
		type = 'NOT_COMPATIBLE'
	} else if (hex || hexes.length > 0) {
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

	let statusIcon
	switch (type) {
		case 'UPLOADING':
			statusIcon = generalIcons.sync
			break
		case 'ERROR':
		case 'NOT_COMPATIBLE':
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
				.root {
					overflow: hidden;
				}
				.container {
					display: flex;
					flex-direction: column;
					align-items: stretch;
					position: relative;
					padding: 0.5rem 1rem;
					border-radius: 0.5rem;
					height: 13rem;
					overflow: hidden;
				}
				.root.IDDLE .container,
				.root.NO_HEX .container,
				.root.BUSY .container {
					background-color: ${tinycolor(GRAY).setAlpha(0.25).toRgbString()};
				}
				.root.UPLOADING .container {
					background-color: ${tinycolor(YELLOW).toRgbString()};
				}
				.root.SUCCESS .container {
					background-color: ${tinycolor(GREEN).setAlpha(0.75).toRgbString()};
				}
				.root.NOT_COMPATIBLE .container,
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
				.container :global(.disconnect-warning),
				.container :global(.not-compatible-warning),
				.container :global(.compilation-status),
				.container :global(.start-upload-button) {
					position: absolute;
					bottom: 0.5rem;
					right: 0.5rem;
				}

				.container :global(.compilation-status){
					display: flex;
					flex-direction: row;
					align-items: center;
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
				.container :global(.quirkbotUploadIsometric_svg__line-cord)  {
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
				.container :global(.quirkbotUploadIsometric_svg__line-chip)  {
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
				.root:not(.UPLOADING) .container :global(.quirkbotUploadIsometric_svg__line-cord),
				.root:not(.UPLOADING) .container :global(.quirkbotUploadIsometric_svg__line-chip) {
					display: none;
				}
				.root:not(.UPLOADING):not(.SUCCESS) .container :global(.quirkbotUploadIsometric_svg__led-lm),
				.root:not(.UPLOADING):not(.SUCCESS) .container :global(.quirkbotUploadIsometric_svg__led-rm),
				.root:not(.UPLOADING):not(.SUCCESS) .container :global(.quirkbotUploadIsometric_svg__led-le),
				.root:not(.UPLOADING):not(.SUCCESS) .container :global(.quirkbotUploadIsometric_svg__led-re){
					display: none;
				}
				.root.UPLOADING .container :global(.quirkbotUploadIsometric_svg__led-lm)  {
					animation: led-blink-animation 0.1s linear infinite alternate;
				}
				.root.UPLOADING .container :global(.quirkbotUploadIsometric_svg__led-rm)  {
					animation: led-blink-animation 0.1s linear infinite alternate-reverse;;
				}
				.root.SUCCESS .container :global(.quirkbotUploadIsometric_svg__led-lm),
				.root.SUCCESS .container :global(.quirkbotUploadIsometric_svg__led-rm),
				.root.SUCCESS .container :global(.quirkbotUploadIsometric_svg__led-le),
				.root.SUCCESS .container :global(.quirkbotUploadIsometric_svg__led-re) {
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
				.root.UPLOADING .container :global(.quirkbotUploadIsometric_svg__led-le),
				.root.UPLOADING .container :global(.quirkbotUploadIsometric_svg__led-re) {
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
				{type === 'NOT_COMPATIBLE' &&
					<Message type='error' className='not-compatible-warning'>
						<S value='ui.board.upload.not_compatible_warning'/>
					</Message>
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
						icon={uploadIcon}
						labelKey={type === 'ERROR' ? 'ui.board.upload.restart' : 'ui.board.upload.start'}
						className='start-upload-button'
						textColor={WHITE}
						textHoverColor={WHITE}
						bgColor={GREEN}
						bgHoverColor={GREEN}
					/>
				}
			</div>
		</div>
	)
}

SingleBoardUploader.defaultProps = {
	hexes : []
}

SingleBoardUploader.propTypes = {
	onUploadPress     : PropTypes.func,
	runtimeId         : PropTypes.string,
	hardwareInterface : PropTypes.string,
	uuid              : PropTypes.string,
	midi              : PropTypes.bool,
	serial            : PropTypes.bool,
	uploaderBusy      : PropTypes.bool,
	bootloader        : PropTypes.bool,
	uploading         : PropTypes.bool,
	hex               : PropTypes.string,
	hexes             : PropTypes.arrayOf(PropTypes.string),
	uploadSuccess     : PropTypes.bool,
	uploadError       : PropTypes.string,
}

export default SingleBoardUploader

import PropTypes from 'prop-types'
import IconButton from 'src/components/iconButton'
import Link from 'src/components/link'
import Message from 'src/components/message'
import SingleBoardStatus from 'src/components/singleBoardStatus'
import SingleBoardStatusContainer from 'src/containers/singleBoardStatusContainer'
import S from 'src/containers/sManager'
import {
	WHITE,
	GREEN,
} from 'src/constants/colors'
import webstoreImage from 'src/assets/images/strawbees-code-helper-chrome-webstore.gif'

const UploaderDependencies = ({
	hideTitle,
	os,
	serialBoardIds,
	serialAvailable,
	serialReady,
	midiBoardIds,
	midiAvailable,
	midiReady,
}) =>
	<div className='root uploaderDependencies'>
		<style jsx>{`
			.root {
				display: flex;
				flex-direction: column;
				max-width: 26rem;
			}
			.root :global(.message) {
				margin-bottom: 0.5rem;
			}
			.root :global(.link) {
				text-decoration: none;
			}
			.root :global(.install-button) {
				align-self: flex-end;
			}
			.root :global(.not-detected) :global(.singleBoardStatus) {
				margin-left: -1rem;
			}
			.root :global(.webstore-image) {
				align-self: center;
			}
		`}</style>
		{!serialAvailable && !serialReady &&
			<>
				{!hideTitle &&
					<div className='title global-type global-type-h3'>
						<S value='ui.board.dependencies.serial.title.not_supported' />
					</div>
				}
				<Message type='error'>
					<S
						value='ui.board.dependencies.serial.not_supported'
						markdown={true}
					/>
				</Message>
			</>
		}
		{serialAvailable && !serialReady &&
			<>
				{!hideTitle &&
					<div className='title global-type global-type-h3'>
						<S value='ui.board.dependencies.serial.title.missing' />
					</div>
				}
				<Message type='warning'>
					<S
						value='ui.board.dependencies.serial.install.text'
						markdown={true}
					/>
					<img className='webstore-image'
						alt='Strawbees CODE Helper installation'
						src={webstoreImage}
					/>
				</Message>
				<Link to='https://chrome.google.com/webstore/detail/strawbees-code-helper/ackaalhbfjagidmjlhlokoblhbnahegd'
					external={true}
					className='install-button'>
					<IconButton
						labelKey='ui.board.dependencies.serial.install.cta'
						textColor={WHITE}
						textHoverColor={WHITE}
						bgColor={GREEN}
						bgHoverColor={GREEN}
					/>
				</Link>
			</>
		}
		{serialAvailable && serialReady &&
			<>
				{!hideTitle &&
					<div className='title global-type global-type-h3'>
						<S value='ui.board.dependencies.serial.title.ready' />
					</div>
				}
				{serialBoardIds.length === 0 &&
					<>
						{os &&
							os.family &&
							os.family.toLowerCase().indexOf('windows') !== -1 &&
							os.version.indexOf('10') === -1 &&
							<Link to='https://github.com/Quirkbot/QuirkbotWindowsDriverInstaller/releases/download/2.0.0/quirkbot-windows-drivers-2.0.0.exe'
								external={true}>
								<Message type='error'>
									<S
										value='ui.board.dependencies.serial.windows_driver'
										markdown={true}
									/>
								</Message>
							</Link>
						}
						<Message type='warning' className='not-detected'>
							<SingleBoardStatus
								scale={1.25}
								status='notConnected'
							/>
							<S
								value='ui.board.upload.error.notConnected'
								markdown={true}
							/>
						</Message>
					</>
				}
				{serialBoardIds.length > 0 &&
					<Message type='success' className='not-detected'>
						<SingleBoardStatus
							scale={1.25}
							status='ok'
						/>
						<S
							value='ui.board.dependencies.serial.ready'
							markdown={true}
						/>
					</Message>
				}
			</>
		}
	</div>

UploaderDependencies.propTypes = {
	hideTitle       : PropTypes.bool,
	os              : PropTypes.object,
	serialBoardsIds : PropTypes.arrayOf(PropTypes.string),
	serialAvailable : PropTypes.bool,
	serialReady     : PropTypes.bool,
	midiBoardIds    : PropTypes.arrayOf(PropTypes.string),
	midiAvailable   : PropTypes.bool,
	midiReady       : PropTypes.bool,
}

export default UploaderDependencies

import PropTypes from 'prop-types'
import IconButton from 'src/components/iconButton'
import Link from 'src/components/link'
import Message from 'src/components/message'
import SingleBoardStatus from 'src/components/singleBoardStatus'
import S from 'src/containers/sManager'
import {
	WHITE,
	GREEN,
} from 'src/constants/colors'

const UploaderDependencies = ({
	rootPath,
	hideTitle,
	uploaderNeedsDriver,
	serialBoardIds,
	serialAvailable,
	serialAllowed,
	serialReady,
	extensionUrl,
	driverUrl,
	requestWebSerialAccess,
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
			.root :global(.install-button),
			.root :global(.install-button-link) {
				align-self: flex-end;
			}
			.root :global(.not-detected) :global(.singleBoardStatus) {
				margin-left: -1rem;
			}
			.root :global(.webstore-image) {
				align-self: center;
			}
		`}</style>
		{!serialAvailable && !serialAllowed && !serialReady &&
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
		{serialAvailable && !serialAllowed && !serialReady &&
			<>
				{!hideTitle &&
					<div className='title global-type global-type-h3'>
						<S value='ui.board.dependencies.serial.title.allow_web_serial_access' />
					</div>
				}
				<Message type='warning'>
					<S
						value='ui.board.dependencies.serial.allow_web_serial_access.text'
						markdown={true}
					/>
				</Message>
				<IconButton
					onClick={requestWebSerialAccess}
					className='install-button'
					labelKey='ui.board.dependencies.serial.allow_web_serial_access.cta'
					textColor={WHITE}
					textHoverColor={WHITE}
					bgColor={GREEN}
					bgHoverColor={GREEN}
				/>
			</>
		}
		{serialAvailable && serialAllowed && !serialReady &&
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
						src={`${rootPath}/static/images/strawbees-code-helper-chrome-webstore.gif`}
					/>
				</Message>
				<Link to={extensionUrl}
					external={true}
					className='install-button'
				>
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
		{serialAvailable && serialAllowed && serialReady &&
			<>
				{!hideTitle &&
					<div className='title global-type global-type-h3'>
						<S value='ui.board.dependencies.serial.title.ready' />
					</div>
				}
				{serialBoardIds.length === 0 &&
					<>
						{uploaderNeedsDriver &&
							<Link to={driverUrl}
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
								value='ui.board.dependencies.serial.no_boards_detected'
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
	rootPath               : PropTypes.string,
	hideTitle              : PropTypes.bool,
	uploaderNeedsDriver    : PropTypes.bool,
	serialBoardsIds        : PropTypes.arrayOf(PropTypes.string),
	serialAvailable        : PropTypes.bool,
	serialAllowed          : PropTypes.bool,
	serialReady            : PropTypes.bool,
	midiBoardIds           : PropTypes.arrayOf(PropTypes.string),
	midiAvailable          : PropTypes.bool,
	midiReady              : PropTypes.bool,
	extensionUrl           : PropTypes.string,
	driverUrl              : PropTypes.string,
	requestWebSerialAccess : PropTypes.func,
}

export default UploaderDependencies

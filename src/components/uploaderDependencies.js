import PropTypes from 'prop-types'
import getConfig from 'next/config'
import IconButton from 'src/components/iconButton'
import Button from 'src/components/button'
import Link from 'src/components/link'
import Message from 'src/components/message'
import SingleBoardStatus from 'src/components/singleBoardStatus'
import S from 'src/containers/sManager'
import {
	WHITE,
	GREEN,
	GRAY,
} from 'src/constants/colors'

const {
	publicRuntimeConfig : {
		PREFER_WEB_SERIAL,
	},
} = getConfig()

const UploaderDependencies = ({
	rootPath,
	hideTitle,
	uploaderNeedsDriver,
	serialBoardIds,
	serialAvailable,
	serialAllowed,
	serialAllowedStatus,
	serialReady,
	extensionUrl,
	driverUrl,
	requestWebSerialAccess,
	resetWebSerialAccess,
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
			.root :global(.install-button-link),
			.root :global(.reset-permissions) {
				align-self: flex-end;
			}
			.root :global(.reset-permissions) {
				margin-top:1rem;
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
				<Button
					onClick={requestWebSerialAccess}
					className='install-button'
					textColor={WHITE}
					textHoverColor={WHITE}
					bgColor={GREEN}
					bgHoverColor={GREEN}
				>
					<S value='ui.board.dependencies.serial.allow_web_serial_access.cta'	/>
					{
						serialAllowedStatus.every(status => !status)
							? ' (1/2)'
							: serialAllowedStatus.every(status => status)
								? ''
								: ' (2/2)'
					}
				</Button>
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
							{PREFER_WEB_SERIAL &&
								<IconButton
									onClick={resetWebSerialAccess}
									className='reset-permissions'
									labelKey='ui.board.dependencies.serial.allow_web_serial_access.reset-permissions'
									textColor={WHITE}
									textHoverColor={WHITE}
									bgColor={GRAY}
									bgHoverColor={GRAY}
																	 />
							}
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
	resetWebSerialAccess   : PropTypes.func,
	serialAllowedStatus(props, propName) {
		if (!Array.isArray(props[propName]) || props[propName].length !== 2 || !props[propName].every((v) => typeof v === 'boolean')) {
			return new Error(`${propName} needs to be an array of two booleans.`)
		}
		return null
	},
}

export default UploaderDependencies

import React from 'react'
import PropTypes from 'prop-types'
import tinycolor from 'tinycolor2'
import S from 'src/containers/sManager'
import Button from 'src/components/button'
import Link from 'src/components/link'
import SvgIcon from 'src/components/svgIcon'
import platformIcons from 'src/assets/icons/platforms'
import {
	BLACK,
	GRAY,
	GREEN,
	WHITE,
} from 'src/constants/colors'

const DownloadInfo = ({
	urls,
	currentPlatform,
	currentArch,
	platform,
	arch,
}) => {
	if (!urls[platform] || !urls[platform][arch] || !urls[platform][arch].url) {
		return null
	}
	const {
		url,
		version,
	} = urls[platform][arch]
	const selected = currentArch === arch && currentPlatform === platform
	return (
		<div className={`info ${platform} ${arch} ${selected ? 'selected' : 'not-selected'}`}>
			<div className='platform-icon'>
				<SvgIcon icon={platformIcons[platform]} />
			</div>
			<div className='platform-name'>
				<S value={`download.platform.${platform}`}/>
			</div>
			<div className='arch'>
				{`${arch === 'ia32' ? '32' : arch === 'x64' ? '64' : ''} bits`}
			</div>
			<Link
				to={url}
				external={true}>
				<Button
					bgColor={GREEN}
					bgHoverColor={GREEN}
					textColor={WHITE}
					textHoverColor={WHITE}>
					<S value='download.download-cta'/>{` v${version}`}
				</Button>
			</Link>
		</div>
	)
}

class PageDownload extends React.Component {
	state = {
		urls : {
			win32 : {
				x64 : {
					name     : null,
					version  : null,
					url      : null,
					checksum : null,
				},
				ia32 : {
					name     : null,
					version  : null,
					url      : null,
					checksum : null,
				},
			},
			darwin : {
				x64 : {
					name     : null,
					version  : null,
					url      : null,
					checksum : null,
				},
			},
		},
	}

	loadDownloadData = async (platform, arch) => {
		const base = this.props.urls[platform][arch]
		if (this.isUnmounted) {
			return
		}
		const {
			name,
			version,
			installer : { path, checksum },
		} = await (await fetch(`${base}/latest.json`)).json()
		if (this.isUnmounted) {
			return
		}
		this.setState({
			...this.state,
			urls : {
				...this.state.urls,
				[platform] : {
					...this.state.urls[platform],
					[arch] : {
						...this.state.urls[platform][arch],
						name,
						version,
						checksum,
						url : `${base}/${path}`,
					},
				},
			},
		})
	}

	async componentDidMount() {
		this.loadDownloadData('win32', 'x64')
		this.loadDownloadData('win32', 'ia32')
		this.loadDownloadData('darwin', 'x64')
	}

	componentWillUnmount() {
		this.isUnmounted = true
	}

	render() {
		const {
			currentPlatform,
			currentArch,
		} = this.props
		const {
			urls,
		} = this.state
		return (
			<div className='root pageDownload'>
				<style jsx>{`
					.root {
						justify-content: center;
						background-color: ${tinycolor(GRAY).lighten(25).toRgbString()};
						padding: 1rem;
						flex: 1;
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
						min-height: min-content;
					}
					.title {
						margin: 0;
					}
					.description {
						max-width: 25rem;
						margin-bottom: 1rem;
					}
					.downloads:empty {
						display: none;
					}
					.downloads {
						display: flex;
						flex-direction: row;
						align-items: center;
						background-color: ${WHITE};
						padding: 1rem;
						border-radius: 1rem;
					}
					.downloads :global(.info) {
						box-sizing: border-box;
						display: flex;
						flex-direction: column;
						align-items: center;
						background-color: ${WHITE};
						margin: 0.5rem;
						padding: 0.5rem;
						border-radius: 0.5rem;
						border: solid 0.05rem ${tinycolor(GRAY).lighten(25).toRgbString()};
						color: ${GRAY};
					}
					.downloads :global(.info .platform-icon .svgIcon) {
						height: 3rem;
						width: 3rem;
						fill: ${tinycolor(GRAY).toRgbString()};
					}
					.downloads :global(.info .arch) {
						font-size: 0.8rem;
					}
					.downloads :global(.info.selected) {
						order: -1;
						border-color: ${BLACK};
						color: ${BLACK};
					}
					.downloads :global(.info.selected .platform-icon .svgIcon) {
						fill: ${BLACK};
					}
					.downloads :global(.info a) {
						text-decoration: none;
					}
					@media (max-width: 650px) {
						.title {
							font-size: 1.5rem;
						}
						.downloads {
							flex-direction: column;
						}
					}
				`}</style>
				<h1 className='title'>
					<S value='download.base.title'/>
				</h1>
				<div className='description'>
					<S value='download.base.description' markdown={true}/>
				</div>
				<div className='downloads'>
					<DownloadInfo
						urls={urls}
						currentPlatform={currentPlatform}
						currentArch={currentArch}
						platform='win32'
						arch='x64'
					/>
					<DownloadInfo
						urls={urls}
						currentPlatform={currentPlatform}
						currentArch={currentArch}
						platform='win32'
						arch='ia32'
					/>
					<DownloadInfo
						urls={urls}
						currentPlatform={currentPlatform}
						currentArch={currentArch}
						platform='darwin'
						arch='x64'
					/>
				</div>
			</div>
		)
	}
}

PageDownload.defaultProps = {}

PageDownload.propTypes = {
	currentPlatform : PropTypes.string,
	currentArch     : PropTypes.string,
	urls            : PropTypes.shape({
		win32 : PropTypes.shape({
			x64  : PropTypes.string,
			ia32 : PropTypes.string,
		}),
		darwin : PropTypes.shape({
			x64 : PropTypes.string,
		}),
	}),
}

export default PageDownload

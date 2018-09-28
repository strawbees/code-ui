import React from 'react'
import PropTypes from 'prop-types'
import tinycolor from 'tinycolor2'
import S from 'src/containers/sManager'
import {
	BLACK,
	BLUE,
	WHITE
} from 'src/constants/colors'

class CopyableUrl extends React.Component {
	state = {
		showCopied : false
	}

	constructor(props) {
		super(props)

		this.urlField = React.createRef()
	}

	copyToClipboard = (e) => {
		if (e.key && e.key !== 'Enter') {
			return
		}

		const el = document.createElement('textarea')
		el.value = this.props.url
		document.body.appendChild(el)
		el.select()
		document.execCommand('copy')
		document.body.removeChild(el)

		this.urlField.current.focus()
		window.getSelection().selectAllChildren(this.urlField.current)

		this.setState({ showCopied : true })
		window.clearInterval(this.showCopiedTimer)
		this.showCopiedTimer = window.setInterval(
			() => this.setState({ showCopied : false }),
			3000
		)
	}

	componentWillUnmount() {
		window.clearInterval(this.showCopiedTimer)
	}

	render() {
		const {
			title,
			titleKey,
			url,
			description,
			descriptionKey
		} = this.props
		const {
			showCopied
		} = this.state
		return (
			<div className='root copyableUrl'
				role='button'
				tabIndex={0}
				onClick={this.copyToClipboard}
				onKeyPress={this.copyToClipboard}>
				<style jsx>{`
					.root {
						display: flex;
						flex-direction: column;
						align-items: center;
						outline: none;
					}
					.title {
						font-weight: bold;
					}
					.url {
						font-size: 0.65rem;
						font-family: Code;
						background-color: ${tinycolor(WHITE).toRgbString()};
						color: ${tinycolor(BLACK).setAlpha(0.7).toRgbString()};
						padding: 0.25rem 0.5rem;
						border-radius: 0.2rem;
						max-width: 20rem;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis
					}
					.description {
						font-size: 0.7rem;
						margin-bottom: 0.2rem;
					}
					.root:focus .url,
					.root:focus-within .url,
					.url:focus {
						outline: none;
						box-shadow: 0 0 0 0.1rem ${tinycolor(BLUE).setAlpha(0.5).toRgbString()};
					}
					.instructions {
						font-size: 0.8rem;
						color: ${tinycolor(BLUE).setAlpha(0.7).toRgbString()};
					}
				`}</style>
				{(titleKey || title) &&
					<div className='title'>
						{titleKey && !title &&
							<S value={titleKey} />
						}
						{title}
					</div>
				}
				{(descriptionKey || description) &&
					<div className='description'>
						{descriptionKey && !description &&
							<S value={descriptionKey} />
						}
						{description}
					</div>
				}
				{url &&
					<div className='url'
						tabIndex={0}
						ref={this.urlField}>
						{url}
					</div>
				}
				<div
					className='instructions'>
					<S value={showCopied ? 'ui.copyable_url.instruction.copied' : 'ui.copyable_url.instruction.iddle'} />
				</div>
			</div>
		)
	}
}

CopyableUrl.propTypes = {
	title          : PropTypes.string,
	titleKey       : PropTypes.string,
	url            : PropTypes.string,
	description    : PropTypes.string,
	descriptionKey : PropTypes.string,
}

export default CopyableUrl

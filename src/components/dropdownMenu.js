import React from 'react'
import PropTypes from 'prop-types'
import tinycolor from 'tinycolor2'
import S from 'src/containers/sManager'
import Link from 'src/components/link'
import SvgIcon from 'src/components/svgIcon'
import expandIcon from 'src/assets/icons/general/expand.svg'
import { WHITE, BLUE } from 'src/constants/colors'

class DropdownMenu extends React.Component {
	state = {
		linkFromKey : ''
	}

	constructor(props) {
		super(props)
		this.listRef = React.createRef()
		this.buttonRef = React.createRef()
	}

	openList = () => {
		// console.log(document.activeElement, document.activeElement === this.buttonRef.current)
		// this.listRef.current.focus()
		// console.log(document.activeElement, document.activeElement === this.buttonRef.current)
	}

	blurActiveElement = () => {
		document.activeElement.blur()
	}

	render() {
		const {
			labelKey,
			options,
		} = this.props
		const {
			listRef,
			buttonRef,
			openList,
			blurActiveElement,
		} = this
		return (
			<div className='root dropdownMenu'>
				<style jsx>{`
					.root {
						display: flex;
						flex-direction: column;
						align-items: center;
						position: relative;
					}
					.label {
						display: flex;
						flex-direction: row;
						align-items: center;
						height: 100%;
						padding: 0 0.5rem;
						font-weight: bold;
						text-transform: uppercase;
						color: ${tinycolor(WHITE).toRgbString()};
						fill: ${tinycolor(WHITE).toRgbString()};
					}
					.label:hover,
					.label:focus,
					.root:focus-within .label{
						outline: none;
						background-color: ${tinycolor(BLUE).toRgbString()};
					}
					.label :global(.svgIcon) {
						margin-left: 0.25rem;
						width: 0.8rem;
						height: 0.8rem;
					}
					.list {
						display: flex;
						flex-direction: column;
						position: absolute;
						top: 100%;
						left: 0;
						z-index: 1;
						padding: 0;
						margin: 0;
						background-color: ${tinycolor(BLUE).toRgbString()};
						color: ${tinycolor(WHITE).toRgbString()};
						padding: 0.5rem;
						border-radius: 0.5rem;
						border-top-left-radius: 0;
						border-top-right-radius: 0;
						opacity: 0;
						transform: scale3d(0,0,1);
						transform-origin: top left;
						width: 12rem;
					}
					.label:focus + .list,
					.list:focus,
					.list:focus-within{
						/*transition: opacity 0.1s ease-out, transform 0.1s ease-out;*/
						outline: none;
						opacity: 1;
						transform: scale3d(1,1,1);
					}
					.list .option {
						list-style: none;
						cursor: pointer;
						padding: 0 0.25rem;
					}
					.list .option:not(.disabled):hover,
					.list .option:not(.disabled):focus,
					.list .option:not(.disabled):focus-within {
						outline: none;
						background-color: rgba(255,255,255, 0.2);
						border-radius: 0.2rem;
					}
					.list .option :global(a) {
						text-decoration: none;
					}
					.list .option :global(.link:focus) {
						outline: none;
					}
					.list .option.disabled {
						cursor: auto;
						color: rgba(255,255,255,0.4);
					}
					.list .option.divider {
						margin-top: 0.25rem;
						border-top: solid 1px rgba(0,0,0, 0.1);
					}
					.list .option.disabled:hover {
						font-weight: normal;
					}
					@media (max-width: 750px) {
						.label :global(.svgIcon) {
							display: none;
						}
					}
					@media (max-width: 450px) {
						.label {
							font-size: 0.8rem;
						}
					}
				`}</style>
				<button
					className='label'
					aria-haspopup='listbox'
					ref={buttonRef}
					onClick={openList}>
					<S value={labelKey}/>
					<SvgIcon icon={expandIcon}/>
				</button>
				<ul className='list'
					role='listbox'
					tabIndex='-1'
					ref={listRef}>
					{options.map(option =>
						<li key={option.labelKey}
							className={`option ${option.disabled ? 'disabled' : ''} ${option.divider ? 'divider' : ''}`}
							role='option'
							tabIndex={`${(option.disabled || option.link) ? '-1' : '0'}`}
							onClick={option.disabled ? null : () => {
								blurActiveElement()
								if (option.onClick) {
									option.onClick()
								}
							}}>
							{option.disabled &&
								<S value={option.disabledLabelKey || option.labelKey}/>
							}
							{(!option.disabled && !option.link && !option.linkKey) &&
								<S value={option.labelKey}/>
							}
							{(!option.disabled && option.link && !option.linkKey) &&
								<Link to={option.link} external={option.linkExternal}>
									<S value={option.labelKey}/>
								</Link>
							}
							{(!option.disabled && !option.link && option.linkKey) &&
								<React.Fragment>
									<S
										value={option.linkKey}
										render={false}
										onChange={(linkFromKey) => {
											if (this.state.linkFromKey !== linkFromKey) {
												this.setState({ linkFromKey })
											}
										}}
									/>
									<Link to={this.state.linkFromKey} external={option.linkExternal}>
										<S value={option.labelKey}/>
									</Link>
								</React.Fragment>
							}
						</li>
					)}
				</ul>
			</div>
		)
	}
}

DropdownMenu.defaultProps = {
	options : []
}

DropdownMenu.propTypes = {
	labelKey : PropTypes.string,
	options  : PropTypes.arrayOf(PropTypes.shape({
		labelKey         : PropTypes.string,
		disabledLabelKey : PropTypes.string,
		onClick          : PropTypes.func,
		disabled         : PropTypes.bool,
		link             : PropTypes.string,
		linkKey          : PropTypes.string,
		linkExternal     : PropTypes.bool,
	}))
}

export default DropdownMenu

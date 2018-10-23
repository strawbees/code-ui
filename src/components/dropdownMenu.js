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
		this.buttonRef.current.focus()
	}

	blurActiveElement = () => {
		document.activeElement.blur()
	}

	render() {
		const {
			alignRight,
			smallType,
			labelKey,
			label,
			icon,
			options,
			responsiveHideLabel,
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
						font-weight: ${smallType ? 'normal' : 'bold'};
						text-transform: ${smallType ? 'none' : 'uppercase'};
						color: ${tinycolor(WHITE).toRgbString()};
						fill: ${tinycolor(WHITE).toRgbString()};
					}
					.label:hover,
					.label:focus,
					.root:focus-within .label{
						outline: none;
						background-color: ${tinycolor(BLUE).toRgbString()};
					}
					.label :global(.icon) {
						width: 1.75rem;
						height: 1.75rem;
						margin-right: 0.25rem;
					}
					.label :global(.expand-icon) {
						margin-left: 0.25rem;
						width: 0.8rem;
						height: 0.8rem;
					}
					.list {
						display: flex;
						flex-direction: column;
						position: absolute;
						top: 100%;
						${alignRight ? 'right: 0;' : 'left: 0;'}
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
						display: flex;
						flex-direction: row;
						align-items: center;
						justify-content: flex-start;
						padding: 0 0.25rem;
					}
					.list .option :global(.option-icon) {
						width: 1.5rem;
						height: 1.5rem;
						margin-right: 0.25rem;
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
					.list .option.disabled :global(.svgIcon){
						opacity: 0.4;
					}
					.list .option.divider {
						margin-top: 0.25rem;
						border-top: solid 1px rgba(0,0,0, 0.1);
					}
					.list .option.disabled:hover {
						font-weight: normal;
					}
					@media (max-width: 825px) {
						.label .text {
							${responsiveHideLabel ? 'display: none;' : ''}
						}
						.label :global(.expand-icon) {
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
					tabIndex='0'
					ref={buttonRef}
					onClick={openList}>
					{icon &&
						<SvgIcon icon={icon}
							className='icon'/>
					}
					<span className='text'>
						{label}
						{!label &&
							<S value={labelKey}/>
						}
					</span>
					<SvgIcon icon={expandIcon}
						className='expand-icon'/>
				</button>
				<ul className='list'
					role='listbox'
					tabIndex='-1'
					ref={listRef}>
					{options.filter(option => option).map((option, i) => {
						const onClickOrEnter = option.disabled ? null : (evt) => {
							if (evt.key && evt.key !== 'Enter') {
								return
							}
							blurActiveElement()
							if (option.onClick) {
								option.onClick()
							}
						}
						return (
							<li key={i}
								className={`option ${option.disabled ? 'disabled' : ''} ${option.divider ? 'divider' : ''}`}
								role='option'
								tabIndex={`${(option.disabled || option.link) ? '-1' : '0'}`}
								onClick={onClickOrEnter}
								onKeyUp={onClickOrEnter}>
								{option.icon &&
									<SvgIcon icon={option.icon}
										className='option-icon'/>
								}
								{option.disabled &&
									<S value={
										option.disabledLabel ||
										option.disabledLabelKey ||
										option.label ||
										option.labelKey
									}/>
								}
								{(!option.disabled && !option.link && !option.linkKey) &&
									<S value={option.label || option.labelKey}/>
								}
								{(!option.disabled && option.link && !option.linkKey) &&
									<Link to={option.link} external={option.linkExternal}>
										<S value={option.label || option.labelKey}/>
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
											<S value={option.label || option.labelKey}/>
										</Link>
									</React.Fragment>
								}
							</li>
						)
					})}
				</ul>
			</div>
		)
	}
}

DropdownMenu.defaultProps = {
	options : []
}

DropdownMenu.propTypes = {
	labelKey            : PropTypes.string,
	label               : PropTypes.string,
	icon                : PropTypes.func,
	responsiveHideLabel : PropTypes.bool,
	alignRight          : PropTypes.bool,
	smallType           : PropTypes.bool,
	options             : PropTypes.arrayOf(PropTypes.shape({
		icon             : PropTypes.func,
		labelKey         : PropTypes.string,
		label            : PropTypes.string,
		disabledLabelKey : PropTypes.string,
		disabledLabel    : PropTypes.string,
		onClick          : PropTypes.func,
		disabled         : PropTypes.bool,
		link             : PropTypes.string,
		linkKey          : PropTypes.string,
		linkExternal     : PropTypes.bool,
	}))
}

export default DropdownMenu

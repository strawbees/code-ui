import React from 'react'
import PropTypes from 'prop-types'
import tinycolor from 'tinycolor2'
import S from 'src/containers/sManager'
import SvgIcon from 'src/components/svgIcon'
import expandIcon from 'src/assets/icons/general/expand.svg'
import { WHITE, BLUE } from 'src/constants/colors'

class DropdownMenu extends React.Component {
	constructor(props) {
		super(props)
		this.listRef = React.createRef()
	}
	openList = () => {
		this.listRef.current.focus()
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
					.label::before {
						content: '';
						height: 1rem;
						position: absolute;
						left: 0;
						width: 0;
						border-left: solid 1px ${tinycolor(WHITE).toRgbString()};
					}
					.label:hover,
					.label:focus,
					.root:focus-within .label{
						outline: none;
						background-color: ${tinycolor(BLUE).toRgbString()};
					}
					.label:hover::before,
					.label:focus::before,
					.root:focus-within .label::before {
						display: none;
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
						width: 8rem;
					}
					.list:focus,
					.list:focus-within{
						transition: opacity 0.1s ease-out, transform 0.1s ease-out;
						outline: none;
						opacity: 1;
						transform: scale3d(1,1,1);
					}
					.list .option {
						list-style: none;
						cursor: pointer;
						padding: 0 0.25rem;
					}
					.list .option:hover,
					.list .option:focus {
						outline: none;
						background-color: rgba(255,255,255, 0.2);
						border-radius: 0.2rem;
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
				`}</style>
				<button
					className='label'
					aria-haspopup='listbox'
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
							tabIndex={`${option.disabled ? '-1' : '0'}`}
							onClick={option.disabled ? null : () => {
								blurActiveElement()
								option.onClick()
							}}>
							<S value={
								(option.disabled && option.disabledLabelKey) ?
									option.disabledLabelKey :
									option.labelKey
							}/>
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
	}))
}

export default DropdownMenu

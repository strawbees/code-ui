import React from 'react'
import PropTypes from 'prop-types'
import tinycolor from 'tinycolor2'
import IconButton from 'src/components/iconButton'
import Link from 'src/components/link'
import languageIcon from 'src/assets/icons/general/language.svg'
import { WHITE, BLACK } from 'src/constants/colors'

class LocalesMenu extends React.Component {
	state = {
		open : false
	}

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
			current,
			alternatives
		} = this.props
		const {
			open
		} = this.state
		const {
			listRef,
			openList,
			blurActiveElement,
		} = this
		return (
			<div className={`root localesMenu ${open ? 'open' : ''}`}>
				<style jsx>{`
					.root {
						display: flex;
						flex-direction: column;
						align-items: center;
						position: relative;
					}
					.list {
						display: flex;
						flex-direction: column;
						position: absolute;
						top: 0rem;
						right: 2.5rem;
						z-index: 1;
						padding: 0;
						margin: 0;
						background-color: ${tinycolor(WHITE).toRgbString()};
						padding: 0.5rem;
						border-radius: 0.5rem;
						opacity: 0;
						transform: scale3d(0,0,1);
						transform-origin: 100% 1.5rem;
						min-width: 6rem;
						border: solid 0.1rem ${tinycolor(BLACK).toRgbString()};
					}
					.list ul {
						padding: 0;
						margin: 0;
					}
					.list ul li {
						list-style: none;
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
						padding: 0 0.25rem;
						border-bottom: solid 1px rgba(0,0,0,0.1);
					}
					.list .option:not(.current) {
						cursor: pointer;
					}
					.list .option:not(.current):hover,
					.list .option:not(.current):focus {
						outline: none;
						background-color: rgba(0,0,0, 0.1);
						border-radius: 0.2rem;
					}
					.list .option:last-child {
						border-bottom: none;
					}
					.list .option.current {
						font-weight: bold;
					}
					.list .option :global(a) {
						text-decoration: none;
					}
					.list .arrow {
						position: absolute;
						right: -1rem;
						width: 1rem;
						height: 1rem;
						overflow: hidden;
						box-sizing: border-box;
					}
					.list .arrow:before {
						position: absolute;
						content: '';
						background-color: ${tinycolor(WHITE).toRgbString()};
						border: solid 0.1rem ${tinycolor(BLACK).toRgbString()};
						width: 0.7071rem;
						height: 0.7071rem;
						box-sizing: border-box;
						display: block;
						transform: rotateZ(45deg);
						top: 0.15rem;
						left: -0.4rem;
					}
				`}</style>
				<IconButton
					icon={languageIcon}
					aria-haspopup='listbox'
					aria-expanded={open}
					onClick={openList}>
				</IconButton>
				<div className='list'
					role='listbox'
					tabIndex='0'
					ref={listRef}>
					<div className='arrow'></div>
					<ul>
						{current &&
							<li className='option current'
								aria-selected='true'
								role='option'
								onClick={blurActiveElement}>
								{current.name}
							</li>
						}
						{alternatives.map(({ name, url }, key) =>
							<li key={key}
								className='option'
								role='option'
								onClick={blurActiveElement}>
								<Link
									to={url}>
									{name}
								</Link>
							</li>
						)}
					</ul>
				</div>
			</div>
		)
	}
}

LocalesMenu.defaultProps = {
	current      : null,
	alternatives : []
}

LocalesMenu.propTypes = {
	current : PropTypes.shape({
		name : PropTypes.string
	}),
	alternatives : PropTypes.arrayOf(PropTypes.shape({
		name : PropTypes.string,
		url  : PropTypes.string
	}))
}

export default LocalesMenu

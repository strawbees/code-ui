import React from 'react'
import PropTypes from 'prop-types'
import tinycolor from 'tinycolor2'
import Button from 'src/components/button'
import SvgIcon from 'src/components/svgIcon'
import Link from 'src/components/link'
import globe from 'src/assets/icons/general/globe.svg'
import {
	GRAY,
	BLACK
} from 'src/constants/colors'

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
					.root :global(>.button) {
						padding: 0.2rem;
					}
					.root :global(>.button .svgIcon) {
						width: 1.5rem;
						height: 1.5rem;
					}
					.list {
						display: flex;
						flex-direction: column;
						position: absolute;
						top: 2.25rem;
						z-index: 3;
						padding: 0;
						margin: 0;
						background-color: white;
						padding: 0.5rem;
						border-radius: 0.5rem;
						opacity: 0;
						transform: scale3d(0,0,1);
						transform-origin: top center;
						width: 8rem;
						border: solid 0.1rem ${tinycolor(GRAY).toRgbString()};
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
						border-bottom: solid 1px rgba(0,0,0,0.1);
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
					.list:before {
						content: '';
						position: absolute;
						left: calc(50% - 0.7rem);
						top: -0.65rem;
						width: 0;
						height: 0;
						border-bottom: 0.7rem solid ${tinycolor(GRAY).toRgbString()};
						border-left: 0.7rem solid transparent;
						border-right: 0.7rem solid transparent;
					}
					.list:after {
						content: '';
						position: absolute;
						left: calc(50% - 0.5rem);
						top: -0.45rem;
						width: 0;
						height: 0;
						border-bottom: 0.5rem solid white;
						border-left: 0.5rem solid transparent;
						border-right: 0.5rem solid transparent;
					}
				`}</style>
				<Button
					aria-haspopup='listbox'
					aria-expanded={open}
					onClick={openList}>
					<SvgIcon icon={globe}/>
				</Button>
				<ul className='list'
					role='listbox'
					tabIndex='0'
					ref={listRef}>
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

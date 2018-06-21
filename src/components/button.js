import PropTypes from 'prop-types'
import tinycolor from 'tinycolor2'
import {
	BLACK,
	WHITE,
	YELLOW,
} from 'src/constants/colors'

const Button = ({
	className,
	children,
	disabled,
	onClick = () => {},
	textColor,
	bgColor,
	textHoverColor,
	bgHoverColor,
	borderColor,
	...otherProps
}) =>
	<button
		className={`root button ${className} ${disabled ? 'disabled' : ''}`}
		disabled={disabled}
		onClick={onClick}
		{...otherProps}>
		<style jsx>{`
			.root {
				display: flex;
				flex-direction: row;
				align-items: center;
				box-sizing: border-box;
				padding: 0.25rem 1rem;
				border-radius: 1rem;
				cursor: pointer;
				color: ${tinycolor(textColor).toRgbString()};
				fill: ${tinycolor(textColor).toRgbString()};
				background-color: ${tinycolor(bgColor).toRgbString()};
				transition: background-color 0.1s;
			}
			.root:not(.disabled):hover,
			.root:focus {
				outline: none;
				box-shadow: 0 0 0 0.15rem ${tinycolor(borderColor).toRgbString()};
				color: ${tinycolor(textHoverColor).toRgbString()};
				fill: ${tinycolor(textHoverColor).toRgbString()};
				background-color: ${tinycolor(bgHoverColor).toRgbString()};
			}
			.root.disabled {
				opacity: 0.7;
				cursor: default;
			}
		`}</style>
		{children}
	</button>
Button.defaultProps = {
	className      : '',
	textColor      : BLACK,
	bgColor        : WHITE,
	textHoverColor : BLACK,
	bgHoverColor   : WHITE,
	borderColor    : YELLOW,
}

Button.propTypes = {
	className      : PropTypes.string,
	children       : PropTypes.node.isRequired,
	disabled       : PropTypes.bool,
	onClick        : PropTypes.func,
	textColor      : PropTypes.string,
	bgColor        : PropTypes.string,
	textHoverColor : PropTypes.string,
	bgHoverColor   : PropTypes.string,
	borderColor    : PropTypes.string,
}

export default Button

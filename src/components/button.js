import PropTypes from 'prop-types'
import tinycolor from 'tinycolor2'
import {
	BLACK,
	WHITE,
	YELLOW,
} from 'src/constants/colors'

const Button = ({
	children,
	disabled,
	onClick = () => {},
	...otherProps
}) =>
	<button
		className={`root button ${disabled ? 'disabled' : ''}`}
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
				color: ${tinycolor(BLACK).toRgbString()};
				background-color: ${tinycolor(WHITE).toRgbString()};
				transition: transform 0.1s,background-color 0.1s;
			}
			.root:not(.disabled):hover,
			.root:focus {
				outline: none;
				transform: scale3d(1.1,1.1,1.1);
				background-color: ${tinycolor(YELLOW).lighten(30).toRgbString()};
			}
			.root:active {
				transition: none;
				transform: scale3d(1,1,1);
				background-color: ${tinycolor(YELLOW).toRgbString()};
			}
			.root.disabled {
				opacity: 0.7;
				cursor: default;
			}
		`}</style>
		{children}
	</button>

Button.propTypes = {
	children : PropTypes.node.isRequired,
	disabled : PropTypes.bool,
	onClick  : PropTypes.func,
}

export default Button

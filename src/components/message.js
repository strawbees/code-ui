import PropTypes from 'prop-types'
import tinycolor from 'tinycolor2'
import {
	WHITE,
	BLACK,
	YELLOW,
	RED,
	GREEN,
} from 'src/constants/colors'

const Message = ({
	className,
	children,
	type,
	...otherProps
}) => {
	let bgColor
	let color
	switch (type) {
		case 'error':
			bgColor = tinycolor(RED).setAlpha(0.5).toRgbString()
			color = tinycolor(RED).darken(35).toRgbString()
			break
		case 'success':
			bgColor = tinycolor(GREEN).setAlpha(0.5).toRgbString()
			color = tinycolor(GREEN).darken(35).toRgbString()
			break
		case 'blank':
			bgColor = tinycolor(WHITE).setAlpha(0.5).toRgbString()
			color = tinycolor(BLACK).toRgbString()
			break
		case 'inverted':
			bgColor = tinycolor(BLACK).setAlpha(0.5).toRgbString()
			color = tinycolor(WHITE).toRgbString()
			break
		case 'warning':
		default:
			bgColor = tinycolor(YELLOW).setAlpha(0.5).toRgbString()
			color = tinycolor(YELLOW).darken(35).toRgbString()
			break
	}
	return (
		<div className={`root message ${className}`}
			{...otherProps}>
			<style jsx>{`
				.root {
					padding: 0.5rem 1rem;
					border-radius: 0.5rem;
					background-color: ${bgColor};
					color: ${color};
					font-size: 0.8rem;
				}
			`}</style>
			{children}
		</div>
	)
}
Message.defaultProps = {
	className : '',
	type      : 'warnig',
}

Message.propTypes = {
	className : PropTypes.string,
	children  : PropTypes.node.isRequired,
	type      : PropTypes.oneOf([
		'warning',
		'error',
		'success',
		'blank',
		'inverted',
	]),
}

export default Message

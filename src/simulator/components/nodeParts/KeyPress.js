import PropTypes from 'prop-types'
import Figure from '../figure'
import KeySVG from '../../assets/images/node-parts/key.svg'
import KeyPressedSVG from '../../assets/images/node-parts/key-pressed.svg'

import {
	NO_KEY,
	KEY_UP,
	KEY_DOWN,
	KEY_LEFT,
	KEY_RIGHT,
	KEY_SPACE,
	KEY_LEFT_CTRL,
	KEY_LEFT_SHIFT,
	KEY_LEFT_ALT,
	KEY_LEFT_GUI,
	KEY_RIGHT_CTRL,
	KEY_RIGHT_SHIFT,
	KEY_RIGHT_ALT,
	KEY_RIGHT_GUI,
	KEY_BACKSPACE,
	KEY_TAB,
	KEY_RETURN,
	KEY_ESC,
	KEY_INSERT,
	KEY_DELETE,
	KEY_PAGE_UP,
	KEY_PAGE_DOWN,
	KEY_HOME,
	KEY_END,
	KEY_CAPS_LOCK,
	KEY_F1,
	KEY_F2,
	KEY_F3,
	KEY_F4,
	KEY_F5,
	KEY_F6,
	KEY_F7,
	KEY_F8,
	KEY_F9,
	KEY_F10,
	KEY_F11,
	KEY_F12,
} from '../../lib/quirkbot'

const keyNames = {}
keyNames[KEY_SPACE] = 'space'
keyNames[KEY_UP] = '▲'
keyNames[KEY_DOWN] = '▼'
keyNames[KEY_LEFT] = '◀'
keyNames[KEY_RIGHT] = '▶'
keyNames[KEY_LEFT_CTRL] = 'control'
keyNames[KEY_LEFT_SHIFT] = 'shift'
keyNames[KEY_LEFT_ALT] = 'alt'
keyNames[KEY_LEFT_GUI] = 'gui'
keyNames[KEY_RIGHT_CTRL] = 'control'
keyNames[KEY_RIGHT_SHIFT] = 'shift'
keyNames[KEY_RIGHT_ALT] = 'alt'
keyNames[KEY_RIGHT_GUI] = 'gui'
keyNames[KEY_BACKSPACE] = 'backspace'
keyNames[KEY_TAB] = 'tag'
keyNames[KEY_RETURN] = 'return'
keyNames[KEY_ESC] = 'esc'
keyNames[KEY_INSERT] = 'insert'
keyNames[KEY_DELETE] = 'del'
keyNames[KEY_PAGE_UP] = 'page up'
keyNames[KEY_PAGE_DOWN] = 'page down'
keyNames[KEY_HOME] = 'home'
keyNames[KEY_END] = 'end'
keyNames[KEY_CAPS_LOCK] = 'caps lock'
keyNames[KEY_F1] = 'f1'
keyNames[KEY_F2] = 'f2'
keyNames[KEY_F3] = 'f3'
keyNames[KEY_F4] = 'f4'
keyNames[KEY_F5] = 'f5'
keyNames[KEY_F6] = 'f6'
keyNames[KEY_F7] = 'f7'
keyNames[KEY_F8] = 'f8'
keyNames[KEY_F9] = 'f9'
keyNames[KEY_F10] = 'f10'
keyNames[KEY_F11] = 'f11'
keyNames[KEY_F12] = 'f12'

export const KeyPress = ({
	keyValue,
	pressed,
}) => {
	if (keyValue === NO_KEY) {
		return null
	}
	let label = `${keyValue}`
	let labelSize = 38
	if (typeof keyNames[keyValue] !== 'undefined') {
		label = keyNames[keyValue]
		labelSize = 22
	}

	switch (keyValue) {
		case KEY_UP:
		case KEY_DOWN:
		case KEY_LEFT:
		case KEY_RIGHT:
			labelSize = 38
			break
		case KEY_BACKSPACE:
			labelSize = 16
			break
		case KEY_RETURN:
			labelSize = 20
			break
		default:
	}
	label = label.toUpperCase()
	const size = 140
	return (
		<div className={`root nodePart KeyPress ${keyValue}`}>
			<style jsx>{`
				.root {
					width: ${size}px;
					height: ${size}px;
					min-width: ${size}px;
					min-height: ${size}px;
					position: relative;
				}
				.label {
					font-size: ${labelSize}px;
					line-height: ${labelSize}px;
					position: absolute;
					width: ${size}px;
					left: ${pressed ? 5 : 0}px;
					top: calc(50% - ${labelSize / 2}px + ${pressed ? 5 : 0}px);
					text-align:center;
				}

			`}</style>
			<Figure
				svg={pressed ? KeyPressedSVG : KeySVG}
				x={size / 2 + 2.5}
				y={size / 2}
			/>
			<div className='label'>{label}</div>
		</div>
	)
}
KeyPress.defaultProps = {
	keyValue : NO_KEY,
	pressed  : 0,
}

KeyPress.propTypes = {
	keyValue : PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string,
	]),
	pressed : PropTypes.bool,
}

export default KeyPress

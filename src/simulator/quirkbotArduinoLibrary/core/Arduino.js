export const millis = Date.now
export const fmod = (a, b) => a % b
export const random = (min, max) => {
	if (typeof max === 'undefined') {
		max = min
		min = 0
	}
	return min + Math.floor(Math.random() * max)
}
export const {
	min,
	max,
	floor,
	ceil,
	round,
} = Math

/* eslint-disable no-console */
export class Serial {
	static begin() {}

	static available() {}

	static write(x) { console.log('Serial.write:', x) }

	static print(x) { console.log('Serial.print:', x) }

	static read() {}
}
/* eslint-enable no-console */

export const KEY_LEFT_CTRL			= 128
export const KEY_LEFT_SHIFT			= 129
export const KEY_LEFT_ALT			= 130
export const KEY_LEFT_GUI			= 131
export const KEY_RIGHT_CTRL			= 132
export const KEY_RIGHT_SHIFT		= 133
export const KEY_RIGHT_ALT			= 134
export const KEY_RIGHT_GUI			= 135
export const KEY_BACKSPACE			= 178
export const KEY_TAB				= 179
export const KEY_RETURN				= 176
export const KEY_ESC				= 177
export const KEY_INSERT				= 209
export const KEY_DELETE				= 212
export const KEY_PAGE_UP			= 211
export const KEY_PAGE_DOWN			= 214
export const KEY_HOME				= 210
export const KEY_END				= 213
export const KEY_CAPS_LOCK			= 193
export const KEY_F1					= 194
export const KEY_F2					= 195
export const KEY_F3					= 196
export const KEY_F4					= 197
export const KEY_F5					= 198
export const KEY_F6					= 199
export const KEY_F7					= 200
export const KEY_F8					= 201
export const KEY_F9					= 202
export const KEY_F10		 		= 203
export const KEY_F11		 		= 204
export const KEY_F12		 		= 205

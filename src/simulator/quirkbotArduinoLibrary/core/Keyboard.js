// #include "HID.h"

//= ===============================================================================
//= ===============================================================================
//  Keyboard

export const KEY_LEFT_CTRL = 0x80
export const KEY_LEFT_SHIFT = 0x81
export const KEY_LEFT_ALT = 0x82
export const KEY_LEFT_GUI = 0x83
export const KEY_RIGHT_CTRL = 0x84
export const KEY_RIGHT_SHIFT = 0x85
export const KEY_RIGHT_ALT = 0x86
export const KEY_RIGHT_GUI = 0x87

export const KEY_UP_ARROW = 0xDA
export const KEY_DOWN_ARROW = 0xD9
export const KEY_LEFT_ARROW = 0xD8
export const KEY_RIGHT_ARROW = 0xD7
export const KEY_BACKSPACE = 0xB2
export const KEY_TAB = 0xB3
export const KEY_RETURN = 0xB0
export const KEY_ESC = 0xB1
export const KEY_INSERT = 0xD1
export const KEY_DELETE = 0xD4
export const KEY_PAGE_UP = 0xD3
export const KEY_PAGE_DOWN = 0xD6
export const KEY_HOME = 0xD2
export const KEY_END = 0xD5
export const KEY_CAPS_LOCK = 0xC1
export const KEY_F1 = 0xC2
export const KEY_F2 = 0xC3
export const KEY_F3 = 0xC4
export const KEY_F4 = 0xC5
export const KEY_F5 = 0xC6
export const KEY_F6 = 0xC7
export const KEY_F7 = 0xC8
export const KEY_F8 = 0xC9
export const KEY_F9 = 0xCA
export const KEY_F10 = 0xCB
export const KEY_F11 = 0xCC
export const KEY_F12 = 0xCD
export const KEY_F13 = 0xF0
export const KEY_F14 = 0xF1
export const KEY_F15 = 0xF2
export const KEY_F16 = 0xF3
export const KEY_F17 = 0xF4
export const KEY_F18 = 0xF5
export const KEY_F19 = 0xF6
export const KEY_F20 = 0xF7
export const KEY_F21 = 0xF8
export const KEY_F22 = 0xF9
export const KEY_F23 = 0xFA
export const KEY_F24 = 0xFB

//  Low level key report: up to 6 keys and shift, ctrl etc at once
// typedef struct
// {
//   uint8_t modifiers;
//   uint8_t reserved;
//   uint8_t keys[6];
// } KeyReport;

/* eslint-disable no-console */
export class Keyboard /* : public Print */ {
	begin() {}

	end() {}

	write(k) { console.log('Arduino>> Serial.write:', k) }

	press(k) { console.log('Arduino>> Keyboard.press:', k) }

	release(k) { console.log('Arduino>> Keyboard.release:', k) }

	releaseAll() {}
}
/* eslint-enable no-console */

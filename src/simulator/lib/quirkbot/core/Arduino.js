/* eslint-disable camelcase,no-underscore-dangle */
// Bootloader
export const MCU = 'atmega32u4'
export const ARCH = 'AVR8'
export const BOARD = 'QUIRKBOT'
export const F_CPU = 8000000
export const pgm_read_byte = (x) => x
export const pgm_read_word = (x) => x

// QuirkbotArduinoHardare/avr/cores/arduino/Arduino.h --------------------------

// #include <stdlib.h>
// #include <stdbool.h>
// #include <string.h>
// #include <math.h>

// #include <avr/pgmspace.h>
// #include <avr/io.h>
// #include <avr/interrupt.h>

// #include "binary.h"

export const HIGH = 0x1
export const LOW = 0x0

export const INPUT = 0x0
export const OUTPUT = 0x1
export const INPUT_PULLUP = 0x2

export const PI = 3.1415926535897932384626433832795
export const HALF_PI = 1.5707963267948966192313216916398
export const TWO_PI = 6.283185307179586476925286766559
export const DEG_TO_RAD = 0.017453292519943295769236907684886
export const RAD_TO_DEG = 57.295779513082320876798154814105
export const EULER = 2.718281828459045235360287471352

export const SERIAL = 0x0
export const DISPLAY = 0x1

export const LSBFIRST = 0
export const MSBFIRST = 1

export const CHANGE = 1
export const FALLING = 2
export const RISING = 3

export const DEFAULT = 1
export const EXTERNAL = 0

export const min = (a, b) => ((a) < (b) ? (a) : (b))
export const max = (a, b) => ((a) > (b) ? (a) : (b))
export const abs = (x) => ((x) > 0 ? (x) : -(x))
export const round = (x) => ((x) >= 0 ? ((x) + 0.5) : ((x) - 0.5))
export const radians = (deg) => ((deg) * DEG_TO_RAD)
export const degrees = (rad) => ((rad) * RAD_TO_DEG)
export const sq = (x) => ((x) * (x))
export const constrain = (amt, low, high) => ((amt) < (low) ? (low) : ((amt) > (high) ? (high) : (amt)))

export const interrupts = () => { /* sei() */ }
export const noInterrupts = () => { /* cli() */ }

export const clockCyclesPerMicrosecond = () => (F_CPU / 1000000)
export const clockCyclesToMicroseconds = (a) => ((a) / clockCyclesPerMicrosecond())
export const microsecondsToClockCycles = (a) => ((a) * clockCyclesPerMicrosecond())

export const lowByte = (w) => (((w) & 0xff))
export const highByte = (w) => (((w) >> 8))

export const bitRead = (value, bit) => (((value) >> (bit)) & 0x01)
export const bitSet = (value, bit) => ((value) |= (1 << (bit)))
export const bitClear = (value, bit) => ((value) &= ~(1 << (bit)))
export const bitWrite = (value, bit, bitvalue) => (bitvalue ? bitSet(value, bit) : bitClear(value, bit))

// avr-libc defines _NOP() since 1.6.2
export const _NOP = () => {}

// typedef unsigned int word;

export const bit = (b) => (1 << (b))

// typedef bool boolean;
// typedef uint8_t byte;

// void init(void);
// void initVariant(void);

// int atexit(void (*func)()) __attribute__((weak));

export const pinMode = (/* a, b */) => {}
export const digitalWrite = (/* a, b */) => {}
export const digitalRead = (/* a */) => {}
export const analogRead = (/* a */) => {}
export const analogReference = (/* mode */) => {}
export const analogWrite = (/* a, int */) => {}

export const millis = Date.now
export const micros = () => millis() * 1000
// void delay(unsigned long);
// void delayMicroseconds(unsigned int us);
export const pulseIn = (/* pin, state, timeout */) => {}
export const pulseInLong = (/* pin, state, timeout */) => {}

export const shiftOut = (/* dataPin, clockPin, bitOrder, val */) => {}
export const shiftIn = (/* dataPin, clockPin, bitOrder */) => {}

export const attachInterrupt = (/* a, b, mode */) => {}
export const detachInterrupt = (/* a */) => {}

// void setup(void);
// void loop(void);

// Get the bit location within the hardware port of the given virtual pin.
// This comes from the pins_*.c file for the active board configuration.

export const analogInPinToBit = (P) => (P)

// On the ATmega1280, the addresses of some of the port registers are
// greater than 255, so we can't store them in uint8_t's.
export const port_to_mode_PGM = []
export const port_to_input_PGM = []
export const port_to_output_PGM = []

export const digital_pin_to_port_PGM = []
// // extern const uint8_t PROGMEM digital_pin_to_bit_PGM[];
export const digital_pin_to_bit_mask_PGM = []
export const digital_pin_to_timer_PGM = []

// Get the bit location within the hardware port of the given virtual pin.
// This comes from the pins_*.c file for the active board configuration.
//
// These perform slightly better as macros compared to inline functions
//
export const digitalPinToPort = (P) => (pgm_read_byte(digital_pin_to_port_PGM[P]))
export const digitalPinToBitMask = (P) => (pgm_read_byte(digital_pin_to_bit_mask_PGM[P]))
export const digitalPinToTimer = (P) => (pgm_read_byte(digital_pin_to_timer_PGM[P]))
// export const analogInPinToBit = (P) => (P)
export const portOutputRegister = (P) => ((pgm_read_word(port_to_output_PGM[P])))
export const portInputRegister = (P) => ((pgm_read_word(port_to_input_PGM[P])))
export const portModeRegister = (P) => ((pgm_read_word(port_to_mode_PGM[P])))

export const NOT_A_PIN = 0
export const NOT_A_PORT = 0

export const NOT_AN_INTERRUPT = -1

export const PA = 1
export const PB = 2
export const PC = 3
export const PD = 4
export const PE = 5
export const PF = 6
export const PG = 7
export const PH = 8
export const PJ = 10
export const PK = 11
export const PL = 12

export const NOT_ON_TIMER = 0
export const TIMER0A = 1
export const TIMER0B = 2
export const TIMER1A = 3
export const TIMER1B = 4
export const TIMER1C = 5
export const TIMER2 = 6
export const TIMER2A = 7
export const TIMER2B = 8

export const TIMER3A = 9
export const TIMER3B = 10
export const TIMER3C = 11
export const TIMER4A = 12
export const TIMER4B = 13
export const TIMER4C = 14
export const TIMER4D = 15
export const TIMER5A = 16
export const TIMER5B = 17
export const TIMER5C = 18

// #ifdef __cplusplus
// #include "WCharacter.h"
// #include "WString.h"
// #include "HardwareSerial.h"
// #include "USBAPI.h"
// #if defined(HAVE_HWSERIAL0) && defined(HAVE_CDCSERIAL)
// #error "Targets with both UART0 and CDC serial not supported"
// #endif

// uint16_t makeWord(uint16_t w);
// uint16_t makeWord(byte h, byte l);

// #define word(...) makeWord(__VA_ARGS__)

// export const pulseIn = (pin, state, timeout = 1000000) => {}
// export const pulseInLong = (pin, state, timeout = 1000000) => {}

export const tone = (/* _pin, frequency, duration = 0 */) => {}
export const noTone = (/* _pin */) => {}

// WMath prototypes
export const random = (_min, _max) => {
	if (typeof _max === 'undefined') {
		_max = _min
		_min = 0
	}
	return _min + Math.floor(Math.random() * _max)
}
export const randomSeed = (/* seed */) => {}
export const map = (x, inMin, inMax, outMin, outMax) => {
	if (inMin === inMax) {
		return inMin
	}
	let result = ((x - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin
	if (outMin < outMax) {
		if (result < outMin) result = outMin
		else if (result > outMax) result = outMax
	} else if (result > outMin) result = outMin
	else if (result < outMax) result = outMax

	return result
}
// <math.h> --------------------------------------------------------------------
/* eslint-disable prefer-destructuring */
export const cos = Math.cos
export const sin = Math.sin
export const tan = Math.tan
export const fabs = Math.abs
export const fmod = (x, y) => x % y
// export const modf = (x, /* double *__iptr */) => {}
// export const modff = (x, /* float *__iptr */) => {}
export const sqrt = Math.sqrt
// export const sqrtf = Math.sqrt
// export const cbrt = (x) => {}
export const hypot = Math.hypot
export const square = (x) => x * x
export const floor = Math.floor
export const ceil = Math.ceil
// export const frexp = (x, /* int *__pexp */) => {}
// export const ldexp = (x, /* int __exp */) => {}
export const exp = Math.exp
export const cosh = Math.cosh
export const sinh = Math.sinh
export const tanh = Math.tanh
export const acos = Math.acos
export const asin = Math.asin
export const atan = Math.atan
export const atan2 = Math.atan2
export const log = Math.log
export const log10 = Math.log10
/* eslint-disable no-restricted-properties */
export const pow = Math.pow
/* eslint-enable no-restricted-properties */
// export const isnan = (x) => {}
// export const isinf = (x) => {}
// export const isfinite = (x) => {}
// export const copysign = (x, y) => {}
// export const signbit = (x) => {}
// export const fdim = (x, y) => {}
// export const fma = (x, y, z) => {}
export const fmax = Math.max
export const fmin = Math.min
export const trunc = Math.trunc
// export const round = (x) => {}
// export const lround = (x) => {}
// export const lrint = (x) => {}
/* eslint-enable prefer-destructuring */

export const M_E = 2.7182818284590452354
export const M_LOG2E = 1.4426950408889634074 /* log_2 e */
export const M_LOG10E = 0.43429448190325182765 /* log_10 e */
export const M_LN2 = 0.69314718055994530942 /* log_e 2 */
export const M_LN10 = 2.30258509299404568402 /* log_e 10 */
export const M_PI = 3.14159265358979323846 /* pi */
export const M_PI_2 = 1.57079632679489661923 /* pi/2 */
export const M_PI_4 = 0.78539816339744830962 /* pi/4 */
export const M_1_PI = 0.31830988618379067154 /* 1/pi */
export const M_2_PI = 0.63661977236758134308 /* 2/pi */
export const M_2_SQRTPI = 1.12837916709551257390 /* 2/sqrt(pi) */
export const M_SQRT2 = 1.41421356237309504880 /* sqrt(2) */
export const M_SQRT1_2 = 0.70710678118654752440 /* 1/sqrt(2) */
// export const NAN = __builtin_nan('')
// export const INFINITY = __builtin_inf()
export const cosf = cos
export const sinf = sin
export const tanf = tan
export const fabsf = fabs
export const fmodf = fmod
// export const cbrtf = cbrt
export const hypotf = hypot
export const squaref = square
export const floorf = floor
export const ceilf = ceil
// export const frexpf = frexp
// export const ldexpf = ldexp
export const expf = exp
export const coshf = cosh
export const sinhf = sinh
export const tanhf = tanh
export const acosf = acos
export const asinf = asin
export const atanf = atan
export const atan2f = atan2
export const logf = log
export const log10f = log10
export const powf = pow
// export const isnanf = isnan
// export const isinff = isinf
// export const isfinitef = isfinite
// export const copysignf = copysign
// export const signbitf = signbit
// export const fdimf = fdim
// export const fmaf = fma
export const fmaxf = fmax
export const fminf = fmin
export const truncf = trunc
export const roundf = round
// export const lroundf = lround
// export const lrintf = lrint

// QuirkbotArduinoHardare/avr/cores/arduino/Arduino.h --------------------------

/* eslint-disable no-console */
export class Serial {
	static begin() {}

	static available() {}

	static write(x) { console.log('Arduino>> Serial.write:', x) }

	static print(x) { console.log('Arduino>> Serial.print:', x) }

	static read() {}
}
/* eslint-enable no-console */

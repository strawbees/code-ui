/* eslint-disable no-mixed-operators, no-cond-assign, no-multi-assign */
/*
*
* TERMS OF USE - EASING EQUATIONS
*
* Open source under the BSD License.
*
* Copyright © 2001 Robert Penner
* All rights reserved.
*
* Redistribution and use in source and binary forms, with or without modification,
* are permitted provided that the following conditions are met:
*
* Redistributions of source code must retain the above copyright notice, this list of
* conditions and the following disclaimer.
* Redistributions in binary form must reproduce the above copyright notice, this list
* of conditions and the following disclaimer in the documentation and/or other materials
* provided with the distribution.
*
* Neither the name of the author nor the names of contributors may be used to endorse
* or promote products derived from this software without specific prior written permission.
*
* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
* EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
* MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
*  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
*  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
*  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
* AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
*  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
* OF THE POSSIBILITY OF SUCH DAMAGE.
*
*/

import {
	cos,
	sin,
	pow,
	sqrt,
	PI,
} from './core/Arduino'

export const EASING_LINEAR = 0
export const EASING_SINE_IN = 1
export const EASING_SINE_OUT = 2
export const EASING_SINE_IN_OUT = 3
export const EASING_QUAD_IN = 4
export const EASING_QUAD_OUT = 5
export const EASING_QUAD_IN_OUT = 6
export const EASING_CUBIC_IN = 7
export const EASING_CUBIC_OUT = 8
export const EASING_CUBIC_IN_OUT = 9
export const EASING_QUART_IN = 10
export const EASING_QUART_OUT = 11
export const EASING_QUART_IN_OUT = 12
export const EASING_QUINT_IN = 13
export const EASING_QUINT_OUT = 14
export const EASING_QUINT_IN_OUT = 15
export const EASING_EXPO_IN = 16
export const EASING_EXPO_OUT = 17
export const EASING_EXPO_IN_OUT = 18
export const EASING_CIRC_IN = 19
export const EASING_CIRC_OUT = 20
export const EASING_CIRC_IN_OUT = 21
export const EASING_BACK_IN = 22
export const EASING_BACK_OUT = 23
export const EASING_BACK_IN_OUT = 24
export const EASING_ELASTIC_IN = 25
export const EASING_ELASTIC_OUT = 26
export const EASING_ELASTIC_IN_OUT = 27
export const EASING_BOUNCE_IN = 28
export const EASING_BOUNCE_OUT = 29
export const EASING_BOUNCE_IN_OUT = 30

export class Easing {
	static function(type, t, b, c, d) {
		switch (type) {
			case EASING_SINE_IN:
				return Easing.sineIn(t, b, c, d)
			case EASING_SINE_OUT:
				return Easing.sineOut(t, b, c, d)
			case EASING_SINE_IN_OUT:
				return Easing.sineInOut(t, b, c, d)
			case EASING_QUAD_IN:
				return Easing.quadIn(t, b, c, d)
			case EASING_QUAD_OUT:
				return Easing.quadOut(t, b, c, d)
			case EASING_QUAD_IN_OUT:
				return Easing.quadInOut(t, b, c, d)
			case EASING_CUBIC_IN:
				return Easing.cubicIn(t, b, c, d)
			case EASING_CUBIC_OUT:
				return Easing.cubicOut(t, b, c, d)
			case EASING_CUBIC_IN_OUT:
				return Easing.cubicInOut(t, b, c, d)
			case EASING_QUART_IN:
				return Easing.quartIn(t, b, c, d)
			case EASING_QUART_OUT:
				return Easing.quartOut(t, b, c, d)
			case EASING_QUART_IN_OUT:
				return Easing.quartInOut(t, b, c, d)
			case EASING_QUINT_IN:
				return Easing.quintIn(t, b, c, d)
			case EASING_QUINT_OUT:
				return Easing.quintOut(t, b, c, d)
			case EASING_QUINT_IN_OUT:
				return Easing.quintInOut(t, b, c, d)
			case EASING_EXPO_IN:
				return Easing.expoIn(t, b, c, d)
			case EASING_EXPO_OUT:
				return Easing.expoOut(t, b, c, d)
			case EASING_EXPO_IN_OUT:
				return Easing.expoInOut(t, b, c, d)
			case EASING_CIRC_IN:
				return Easing.circIn(t, b, c, d)
			case EASING_CIRC_OUT:
				return Easing.circOut(t, b, c, d)
			case EASING_CIRC_IN_OUT:
				return Easing.circInOut(t, b, c, d)
			case EASING_BACK_IN:
				return Easing.backIn(t, b, c, d)
			case EASING_BACK_OUT:
				return Easing.backOut(t, b, c, d)
			case EASING_BACK_IN_OUT:
				return Easing.backInOut(t, b, c, d)
			case EASING_ELASTIC_IN:
				return Easing.elasticIn(t, b, c, d)
			case EASING_ELASTIC_OUT:
				return Easing.elasticOut(t, b, c, d)
			case EASING_ELASTIC_IN_OUT:
				return Easing.elasticInOut(t, b, c, d)
			case EASING_BOUNCE_IN:
				return Easing.bounceIn(t, b, c, d)
			case EASING_BOUNCE_OUT:
				return Easing.bounceOut(t, b, c, d)
			case EASING_BOUNCE_IN_OUT:
				return Easing.bounceInOut(t, b, c, d)
			case EASING_LINEAR:
			default:
				return Easing.linear(t, b, c, d)
		}
	}

	static linear(t, b, c, d) {
		return c * t / d + b
	}

	static sineIn(t, b, c, d) {
		return -c * cos(t / d * (PI / 2)) + c + b
	}

	static sineOut(t, b, c, d) {
		return c * sin(t / d * (PI / 2)) + b
	}

	static sineInOut(t, b, c, d) {
		return -c / 2 * (cos(PI * t / d) - 1) + b
	}

	static quadIn(t, b, c, d) {
		return c * (t /= d) * t + b
	}

	static quadOut(t, b, c, d) {
		return -c * (t /= d) * (t - 2) + b
	}

	static quadInOut(t, b, c, d) {
		if ((t /= d / 2) < 1) return c / 2 * t * t + b
		return -c / 2 * ((--t) * (t - 2) - 1) + b
	}

	static cubicIn(t, b, c, d) {
		return c * (t /= d) * t * t + b
	}

	static cubicOut(t, b, c, d) {
		return c * ((t = t / d - 1) * t * t + 1) + b
	}

	static cubicInOut(t, b, c, d) {
		if ((t /= d / 2) < 1) return c / 2 * t * t * t + b
		return c / 2 * ((t -= 2) * t * t + 2) + b
	}

	static quartIn(t, b, c, d) {
		return c * (t /= d) * t * t * t + b
	}

	static quartOut(t, b, c, d) {
		return -c * ((t = t / d - 1) * t * t * t - 1) + b
	}

	static quartInOut(t, b, c, d) {
		if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b
		return -c / 2 * ((t -= 2) * t * t * t - 2) + b
	}

	static quintIn(t, b, c, d) {
		return c * (t /= d) * t * t * t * t + b
	}

	static quintOut(t, b, c, d) {
		return c * ((t = t / d - 1) * t * t * t * t + 1) + b
	}

	static quintInOut(t, b, c, d) {
		if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b
		return c / 2 * ((t -= 2) * t * t * t * t + 2) + b
	}

	static expoIn(t, b, c, d) {
		return (t === 0) ? b : c * pow(2, 10 * (t / d - 1)) + b
	}

	static expoOut(t, b, c, d) {
		return (t === d) ? b + c : c * (-pow(2, -10 * t / d) + 1) + b
	}

	static expoInOut(t, b, c, d) {
		if (t === 0) return b
		if (t === d) return b + c
		if ((t /= d / 2) < 1) return c / 2 * pow(2, 10 * (t - 1)) + b
		return c / 2 * (-pow(2, -10 * --t) + 2) + b
	}

	static circIn(t, b, c, d) {
		return -c * (sqrt(1 - (t /= d) * t) - 1) + b
	}

	static circOut(t, b, c, d) {
		return c * sqrt(1 - (t = t / d - 1) * t) + b
	}

	static circInOut(t, b, c, d) {
		if ((t /= d / 2) < 1) return -c / 2 * (sqrt(1 - t * t) - 1) + b
		return c / 2 * (sqrt(1 - t * (t -= 2)) + 1) + b
	}

	static backIn(t, b, c, d) {
		const s = 1.70158
		const postFix = t /= d
		return c * (postFix) * t * ((s + 1) * t - s) + b
	}

	static backOut(t, b, c, d) {
		const s = 1.70158
		return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b
	}

	static backInOut(t, b, c, d) {
		let s = 1.70158
		if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b
		const postFix = t -= 2
		return c / 2 * ((postFix) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b
	}

	static elasticIn(t, b, c, d) {
		if (t === 0) return b
		if ((t /= d) === 1) return b + c
		const p = d * 0.3
		const a = c
		const s = p / 4
		const postFix = a * pow(2, 10 * (t -= 1))
		return -(postFix * sin((t * d - s) * (2 * PI) / p)) + b
	}

	static elasticOut(t, b, c, d) {
		if (t === 0) return b
		if ((t /= d) === 1) return b + c
		const p = d * 0.3
		const a = c
		const s = p / 4
		return (a * pow(2, -10 * t) * sin((t * d - s) * (2 * PI) / p) + c + b)
	}

	static elasticInOut(t, b, c, d) {
		if (t === 0) return b; if ((t /= d / 2) === 2) return b + c
		const p = d * (0.3 * 1.5)
		const a = c
		const s = p / 4

		if (t < 1) {
			const postFix = a * pow(2, 10 * (t -= 1))
			return -0.5 * (postFix * sin((t * d - s) * (2 * PI) / p)) + b
		}
		const postFix = a * pow(2, -10 * (t -= 1))
		return postFix * sin((t * d - s) * (2 * PI) / p) * 0.5 + c + b
	}

	static bounceIn(t, b, c, d) {
		return c - Easing.bounceOut(d - t, 0, c, d) + b
	}

	static bounceOut(t, b, c, d) {
		if ((t /= d) < (1 / 2.75)) {
			return c * (7.5625 * t * t) + b
		} if (t < (2 / 2.75)) {
			const postFix = t -= (1.5 / 2.75)
			return c * (7.5625 * (postFix) * t + 0.75) + b
		} if (t < (2.5 / 2.75)) {
			const postFix = t -= (2.25 / 2.75)
			return c * (7.5625 * (postFix) * t + 0.9375) + b
		}
		const postFix = t -= (2.625 / 2.75)
		return c * (7.5625 * (postFix) * t + 0.984375) + b
	}

	static bounceInOut(t, b, c, d) {
		if (t < d / 2) return Easing.bounceIn(t * 2, 0, c, d) * 0.5 + b
		return Easing.bounceOut(t * 2 - d, 0, c, d) * 0.5 + c * 0.5 + b
	}
}

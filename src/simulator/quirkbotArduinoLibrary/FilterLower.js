import {
	min,
} from './core/Arduino'
import { FilterBase } from './FilterBase'

export class FilterLower extends FilterBase {
	constructor() {
		super()
		this.a = 0
		this.b = 0
		this.c = 0
		this.d = 0
		this.value = 0
	}

	destructor() {
		super.destructor()
	}

	push(number) {
		this.a = this.b
		this.b = this.c
		this.c = this.d
		this.d = number

		this.value = min(min(min(this.a, this.b), this.c), this.d)
	}

	a

	b

	c

	d
}

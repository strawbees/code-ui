import { FilterBase } from './FilterBase'

export class FilterMedian extends FilterBase {
	constructor() {
		super()
		this.a = 0
		this.b = 0
		this.c = 0
		this.value = 0
	}

	destructor() {
		super.destructor()
	}

	push(number) {
		this.a = this.b
		this.b = this.c
		this.c = number

		if (this.c < this.b) {
			if (this.c < this.a) {
				if (this.b < this.a) this.value = this.b
				else this.value = this.a
			} else this.value = this.c
		} else if (this.c < this.a) this.value = this.c
		else if (this.b < this.a) this.value = this.a
		else this.value = this.b
	}

	a

	b

	c
}

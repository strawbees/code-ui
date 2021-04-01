import { FilterBase } from './FilterBase'

export class FilterLowPass extends FilterBase {
	constructor() {
		super()
		this.value = 0
		this.factor = 0.5
	}

	destructor() {
		super.destructor()
	}

	push(number) {
		this.value = this.value * this.factor + number * (1 - this.factor)
	}

	factor
}

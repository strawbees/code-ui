export class FilterBase {
	push() {}

	get() {
		return this.value
	}

	set(v) {
		this.value = v
	}

	value
}

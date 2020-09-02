import Vector from './Vector'

export class Event {
	destructor() {}

	add(input, handler) {
		const pos = this.position(input, handler)
		if (pos !== -1) return
		this.inputs.add(input)
		this.handlers.add(handler)
	}

	remove(input, handler) {
		const pos = this.position(input, handler)
		if (pos === -1) return
		this.inputs.removeAt(pos)
		this.handlers.removeAt(pos)
	}

	dispatch(value) {
		for (let i = 0; i < this.handlers.size(); i++) {
			this.handlers.get(i)(value)
		}
	}

	position(input, handler) {
		for (let i = 0; i < this.handlers.size(); i++) {
			if (this.inputs.get(i) === input && this.handlers.get(i) === handler) {
				return i
			}
		}
		return -1
	}

	handlers = new Vector()

	inputs = new Vector()
}

export default Event

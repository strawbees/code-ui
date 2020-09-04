export class Input {
	constructor() {
		this.node = null
		this.output = null

		// A crazy initial value, so when onOutputChange is called for the first
		// time with a real value, it won't clash and  be forwarded to
		// node.onInternalInputChange
		this.value = -12345.67890
	}

	destructor() {
		this.clearOutput()
	}

	/**
	 * Handle for primitives connections.
	 * */
	set(value) {
		this.handleValueConnection(value)
	}

	/**
	 * Handle for output connections.
	 * */
	connect(output) {
		this.handleOutputConnection(output)
	}

	/**
	 * Remove connections
	 * */
	disconnect() {
		this.clearOutput()
	}

	/**
	 * Getter
	 * */
	get() {
		return this.value
	}

	value;

	handleValueConnection(value) {
		/**
		 * Should value connections really clear the output? Maybe it's better
		 * if they keep the connection, so we know that every time we connect to
		 * an output, the only way to disconnect is by explicitly calling the
		 * 'disconnect' method.
		 * */
		this.clearOutput()
		this.onOutputChange(value)
	}

	handleOutputConnection(output) {
		if (this.output === output) {
			return
		}
		this.clearOutput()
		this.output = output
		this.output.event.add(this, this.onOutputChange.bind(this))
		this.onOutputChange(this.output.get())
	}

	onOutputChange(value) {
		//console.log(this)
		if (this.value === value) {
			return
		}
		this.value = value
		if (this.node !== null) {
			this.node.onInternalInputChange(this)
		}
	}

	clearOutput() {
		if (this.output) {
			this.output.event.remove(this, this.onOutputChange)
			this.output = null
		}
	}

	node

	output
}

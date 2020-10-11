export class Node {
	static Bot = null

	constructor(id) {
		this.Bot = Node.Bot
		if (id) {
			this.id = id
			if (this.Bot.NODE_ID_FACTORY < id) this.Bot.NODE_ID_FACTORY = id
		} else {
			this.id = this.Bot.NODE_ID_FACTORY++
		}

		this.Bot.nodes.add(this)
	}

	destructor() {
		this.Bot.nodes.remove(this)
	}

	registerInput(input) {
		input.node = this
	}

	registerInputCollection(inputCollection) {
		inputCollection.node = this
	}

	onInternalInputChange() {}

	id

	Bot

	static ID_FACTORY = 0 // we use instead the Bot.NOTE_ID_FACTORY

	getTypedId() {
		return `${this.nodeType}${this.id}`
	}

	getInternalData() {
		return {
			nodeType : this.nodeType,
			id       : this.getTypedId(),
		}
	}

	externalData = null

	setExternalData(data) {
		this.externalData = data
	}
}

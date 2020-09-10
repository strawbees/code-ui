export class Node {
	constructor(Bot, id) {
		this.Bot = Bot
		if (id) {
			this.id = id
			if (Node.ID_FACTORY < id) Node.ID_FACTORY = id
		} else {
			this.id = Node.ID_FACTORY++
		}

		Bot.nodes.add(this)
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

	static ID_FACTORY = 0

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

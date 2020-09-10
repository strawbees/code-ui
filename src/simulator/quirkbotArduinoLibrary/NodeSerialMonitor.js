import {
	Node,
	InputCollection,
	HasInterval,
	Serial,
} from './CommonNodeIncludes'

export class SerialMonitor extends HasInterval(Node) {
	nodeType = 'SerialMonitor'

	constructor(...args) {
		super(...args)

		this.registerInputCollection(this.items)
		this.interval.set(0.1)
	}

	items = new InputCollection();

	onInterval() {
		if (!this.items.collection.size()) return

		for (let i = 0; i < this.items.collection.size(); i++) {
			Serial.print(i)
			Serial.write(': ')
			Serial.print(this.items.collection[i].get(), 3)
			Serial.write('\t')
		}
		Serial.write('\n')
	}

	getInternalData() {
		const items = []
		for (let i = 0; i < this.items.collection.size(); i++) {
			items.push(this.items.collection.get(i).get())
		}
		return {
			nodeType : this.nodeType,
			id       : this.getTypedId(),
			interval : this.interval.get(),
			items
		}
	}
}

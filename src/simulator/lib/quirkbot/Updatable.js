export const Updatable = (superclass) => class extends superclass {
	constructor(...args) {
		super(...args)
		this.Bot.updatables.add(this)
	}

	destructor() {
		super.destructor()
		this.Bot.updatables.remove(this)
	}

	update() {}
}

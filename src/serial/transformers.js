/**
 * @name SlicerTransformer
 * TransformStream to parse the stream into a chunks of a specific length
 */
export class SlicerTransformer {
	constructor(length = 1) {
		this.container = new Uint8Array()
		this.length = length
	}

	transform(chunk, controller) {
		const tmp = Array.from(this.container).concat(Array.from(chunk))
		if (tmp.length >= this.length) {
			let totallySliced = true
			for (let i = 0; i < tmp.length; i += this.length) {
				const slice = tmp.slice(i, i + this.length)
				if (slice.length === this.length) {
					controller.enqueue(new Uint8Array(slice))
				} else {
					totallySliced = false
					this.container = new Uint8Array(slice)
					break
				}
			}
			if (!totallySliced) {
				this.container = new Uint8Array(tmp.slice(tmp.length - this.length))
			}
		} else {
			this.container = new Uint8Array(tmp)
		}
	}

	flush(controller) {
		controller.enqueue(this.container)
	}
}

/**
 * @name RawSerialReportTransformer
 * TransformStream to parse the stream into a results of the serial report,
 * based on a start and end delimeters.
 */
export class RawSerialReportTransformer {
	constructor(startDelimiter, endDelimiter) {
		this.container = new Uint8Array()
		this.startDelimiter = startDelimiter
		this.endDelimiter = endDelimiter
	}

	transform(chunk, controller) {
		const tmp = Array.from(this.container).concat(Array.from(chunk))
		const startIndex = tmp.indexOf(this.startDelimiter)
		const endIndex = tmp.indexOf(this.endDelimiter)
		if (startIndex !== -1 && endIndex !== -1) {
			const report = tmp.slice(tmp.indexOf(this.startDelimiter) + 1, tmp.indexOf(this.endDelimiter))
			if (report.length) {
				controller.enqueue(new Uint8Array(report))
			}
			this.container = new Uint8Array(tmp.slice(tmp.indexOf(this.endDelimiter) + 1))
		} else {
			this.container = new Uint8Array(tmp)
		}
	}

	flush(controller) {
		controller.enqueue()
	}
}

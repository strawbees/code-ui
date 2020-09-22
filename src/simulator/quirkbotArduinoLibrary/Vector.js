/* eslint-disable camelcase */
// #include "Arduino.h"

// Minimal class to replace std::vector
export class Vector {
	d_size = 0; // Stores no. of actually stored objects

	d_capacity = 0; // Stores allocated capacity

	d_data = []; // Stores data

	// Needed for memory management

	// Adds new value. If needed, allocates more space
	add(data) {
		if (this.d_capacity === this.d_size) this.resize(this.d_capacity + 1)
		this.d_data[this.d_size++] = data
	}

	// Adds new value at specific index. If needed, allocates more space
	addAt(index, data) {
		if (index >= this.d_capacity) this.resize(index + 1)
		if (this.d_capacity === this.d_size) this.resize(this.d_capacity + 1)
		if (index >= this.d_size) {
			for (let i = this.d_size; i <= index; ++i) {
				this.d_data[i] = data
			}
			this.d_size = index + 1
		} else {
			for (let i = this.d_size; i > index; --i) {
				this.d_data[i] = this.d_data[i - 1]
			}
			this.d_data[index] = data
			this.d_size++
		}
	}

	// Removes value by finding it's index and erasing it.
	remove(data) {
		for (let i = 0; i < this.d_size; ++i) {
			if (this.d_data[i] === data) return this.removeAt(i)
		}
		return null
	}

	// Remove a value at an specific index. All other values will be moved
	removeAt(index) {
		if (index >= this.d_size) return
		for (let i = index; i < this.d_size; ++i) {
			this.d_data[i] = this.d_data[i + 1]
		}
		this.d_size--
	}

	// Find the position index of an item
	position(data) {
		for (let i = 0; i < this.d_size; ++i) {
			if (this.d_data[i] === data) return i
		}
		return -1
	}

	// Finds if the vector contains the item
	contains(data) {
		return this.position(data) !== -1
	}

	// Clears all the data from the vector
	clear() {
		this.d_size = 0
		this.d_capacity = 0
		this.d_data = []
	}

	// Size getter
	size() {
		return this.d_size
	}

	// Const getter
	get(index) {
		return this.d_data[index]
	}

	// Allocates more space
	resize(newsize) {
		this.d_capacity = newsize
	}
}

export default Vector

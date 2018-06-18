import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const localStorageGet = (key) => {
	try {
		return JSON.parse(localStorage.getItem(key))
	} catch (e) {
		return null
	}
}
const localStorageSet = (key, value) => {
	try {
		return localStorage.setItem(key, JSON.stringify(value))
	} catch (e) {
		return null
	}
}

const localStorageRemove = (key) => {
	try {
		return localStorage.removeItem(key)
	} catch (e) {
		return null
	}
}

class StorageManager extends React.Component {
	async componentDidMount() {
		const {
			setStatus,
			setCredentials,
			setTempProgram,
			setPrograms,
		} = this.props

		// Load data from local storage
		this.temp = localStorageGet('storage_temp')
		this.credentials = localStorageGet('storage_credentials')
		this.programs = {}
		Object.keys(localStorage).forEach(key => {
			if (key.indexOf('storage_program_') === -1) {
				return
			}
			const program = localStorageGet(key)
			if (program) {
				this.programs[key.replace('storage_program_', '')] = program
			}
		})
		// Pass it to the state
		setTempProgram(this.temp)
		setPrograms(this.programs)
		setCredentials(this.credentials)

		if (!this.credentials) {
			// If there are no credentials, storage is ready
			setStatus('READY')
		} else {
			// If the are credentials, mark as syncing
			setStatus('SYNCING')
		}

		// monitor localStorage for changes
		window.addEventListener('storage', this.onStorage)
	}

	componentWillUnmout() {
		// stop monitoring localStorage for changes
		window.removeEventListener('storage', this.onStorage)
	}

	// Monitor changes done by the state, if there are any, update local storage
	componetDidUpdate() {
		const {
			credentials,
			tempProgram,
			programs,

			setStatus,
		} = this.props

		let needsUpdate = false
		if (this.credentials !== credentials) {
			localStorageSet('storage_credentials', credentials)
			this.credentials = credentials
			needsUpdate = true
		}
		if (this.tempProgram !== tempProgram) {
			localStorageSet('storage_temp', tempProgram)
			this.tempProgram = tempProgram
			needsUpdate = true
		}
		Object.keys(programs).forEach(id => {
			if (!this.programs[id]) {
				// program was added by the state
				localStorageSet(`storage_program_${id}`, programs[id])
				this.programs[id] = programs[id]
				needsUpdate = true
			} else if (this.programs[id] !== programs[id]) {
				// program updated by the state
				localStorageSet(`storage_program_${id}`, programs[id])
				this.programs[id] = programs[id]
				needsUpdate = true
			}
		})
		Object.keys(this.programs).forEach(id => {
			// program was deleted by the state
			if (!programs[id]) {
				localStorageRemove(`storage_program_${id}`)
				delete this.programs[id]
				needsUpdate = true
			}
		})
		if (needsUpdate) {
			setStatus('NEEDS_UPDATE')
		}
	}

	// Monitor changes done by the storage, if there are any, update the state
	onStorage = (e) => {
		console.log(e)
	}

	render() {
		return null
	}
}

StorageManager.propTypes = {
	setStatus      : PropTypes.func,
	setCredentials : PropTypes.func,
	setTempProgram : PropTypes.func,
	setPrograms    : PropTypes.func,
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(StorageManager)

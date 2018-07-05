import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as browserStorage from 'src/utils/browserStorage'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'


class StorageManager extends React.Component {
	async componentDidMount() {
		const {
			setStatus,
			setCredentials,
			setPrograms,
		} = this.props

		// Load data from local storage
		this.temp = browserStorage.get('temp', 'program')
		this.credentials = browserStorage.get('creadentials', 'data')
		this.programs = {}
		browserStorage.getProgramsIds().forEach(id => {
			const program = browserStorage.get('program', id)
			if (program) {
				this.programs[id] = program
			}
		})

		// Pass it to the state
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
		browserStorage.setExternalChangeListener(this.onExternalChange)
	}

	componentWillUnmout() {
		// stop monitoring localStorage for changes
		browserStorage.setExternalChangeListener(null)
	}

	// Monitor changes done by the state, if there are any, update local storage
	componentDidUpdate() {
		const {
			credentials,
			programs,

			setStatus,
		} = this.props

		let needsUpdate = false
		if (this.credentials !== credentials) {
			browserStorage.set('credentials', 'data')
			this.credentials = credentials
			needsUpdate = true
		}
		Object.keys(programs).forEach(id => {
			// program was added/updated by the state
			if (!this.programs[id] || JSON.stringify(this.programs[id]) !== JSON.stringify(programs[id])) {
				browserStorage.set('program', id, programs[id])
				this.programs[id] = programs[id]
				needsUpdate = true
			}
		})
		Object.keys(this.programs).forEach(id => {
			// program was deleted by the state
			if (!programs[id]) {
				browserStorage.remove('program', id)
				delete this.programs[id]
				needsUpdate = true
			}
		})
		if (needsUpdate) {
			setStatus('NEEDS_UPDATE')
		}
	}

	// Monitor changes done by the storage, if there are any, update the state
	onExternalChange = (id, data, dataRaw) => {
		// exit early if data hasn't changed
		if (id && dataRaw === JSON.stringify(this.programs[id])) {
			return
		}
		const {
			safeUpdateProgram,
			removeProgramByIdAndClearEditor,
		} = this.props
		// Update if there is data
		if (data) {
			this.programs[id] = data
			safeUpdateProgram(id, data, true)
		} else {
			delete this.programs[id]
			removeProgramByIdAndClearEditor(id)
		}
	}

	render() {
		return null
	}
}

StorageManager.propTypes = {
	setStatus                       : PropTypes.func,
	setCredentials                  : PropTypes.func,
	setPrograms                     : PropTypes.func,
	safeUpdateProgram               : PropTypes.func,
	removeProgramByIdAndClearEditor : PropTypes.func,
	programs                        : PropTypes.object,
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(StorageManager)

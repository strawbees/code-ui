import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as browserStorage from 'src/utils/browserStorage'
import debounce from 'src/utils/debounce'
import shallowCompareObjects from 'src/utils/shallowCompareObjects'
import {
	NEEDS_SYNC,
} from 'src/constants/storage'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'


class StorageManager extends React.Component {
	async componentDidMount() {
		const {
			setCredentials,
			setPrograms,
			setRemoteMirror,
			setUser,
		} = this.props

		// Load data from local storage
		this.credentials = browserStorage.get('credentials', 'data')
		this.remoteMirror = browserStorage.get('remoteMirror', 'data')
		this.user = browserStorage.get('user', 'data')
		this.programs = {}
		browserStorage.getKeys('program').forEach(id => {
			const program = browserStorage.get('program', id)
			if (program) {
				this.programs[id] = program
			}
		})

		// Pass it to the state
		setCredentials(this.credentials)
		setPrograms(this.programs)
		setRemoteMirror(this.remoteMirror)
		setUser(this.user)

		// Initial sync
		this.cancelSync = debounce('syncStorage', this.syncStorage, 1000)

		// monitor localStorage for changes
		browserStorage.setExternalChangeListener(this.onExternalChange)
	}

	componentWillUnmout() {
		// stop the sync timer
		if (this.cancelSync) {
			this.cancelSync()
		}

		// stop monitoring localStorage for changes
		browserStorage.setExternalChangeListener(null)
	}

	// Monitor changes done by the state, if there are any, update local storage
	componentDidUpdate(prevProps) {
		const {
			credentials,
			user,
			programs,
			status,
			setStatus,
		} = this.props
		// Monitor changes in credentials
		if (!shallowCompareObjects(this.props, prevProps, ['credentials'])) {
			if (this.credentials !== credentials) {
				browserStorage.set('credentials', 'data', credentials)
				this.credentials = credentials
			}
		}
		// Monitor changes in user and programs
		if (!shallowCompareObjects(this.props, prevProps, ['credentials', 'programs', 'user'])) {
			let needsSync = false
			if (this.user !== user) {
				browserStorage.set('user', 'data', user)
				this.user = user
				needsSync = true
			}
			Object.keys(programs).forEach(id => {
				// program was added/updated by the state
				if (!this.programs[id] ||
					JSON.stringify(this.programs[id]) !== JSON.stringify(programs[id])) {
					browserStorage.set('program', id, programs[id])
					this.programs[id] = programs[id]
					needsSync = true
				}
			})
			Object.keys(this.programs).forEach(id => {
				// program was deleted by the state
				if (!programs[id]) {
					browserStorage.remove('program', id)
					delete this.programs[id]
					needsSync = true
				}
			})
			if (needsSync) {
				setStatus(NEEDS_SYNC)
			}
			return
		}

		// Monitor status changes to handle syncing
		if (!shallowCompareObjects(this.props, prevProps, ['status'])) {
			if (status === NEEDS_SYNC) {
				this.cancelSync = debounce('syncStorage', this.syncStorage, 1000)
			}
		}
	}

	// Monitor changes done by the storage, if there are any, update the state
	onExternalChange = (base, id, value, valueRaw) => {
		const {
			setCredentials,
			setRemoteMirror,
			setUser,
			safeUpdateProgram,
			removeProgramByIdAndClearEditor,
		} = this.props

		// Monitor changes in credentials
		if (base === 'credentials' && id === 'data') {
			// exit early if value hasn't changed
			if (valueRaw === JSON.stringify(this.credentials)) {
				return
			}
			this.credentials = value
			setCredentials(value)
			return
		}

		// Monitor changes in credentials
		if (base === 'user' && id === 'data') {
			// exit early if value hasn't changed
			if (valueRaw === JSON.stringify(this.user)) {
				return
			}
			this.user = value
			setUser(value)
			return
		}

		// Monitor changes in remoteMirror
		if (base === 'remoteMirror' && id === 'data') {
			// exit early if value hasn't changed
			if (valueRaw === JSON.stringify(this.user)) {
				return
			}
			this.remoteMirror = value
			setRemoteMirror(value)
			return
		}

		// Monitor changes in programs
		if (base === 'program') {
			// exit early if value hasn't changed
			if (id && valueRaw === JSON.stringify(this.programs[id])) {
				return
			}
			// Update if there is value
			if (value) {
				this.programs[id] = value
				safeUpdateProgram(id, value, true)
			} else {
				delete this.programs[id]
				removeProgramByIdAndClearEditor(id)
			}
		}
	}

	// Syncs the storage
	syncStorage = async () => {
		const {
			safeSync,
		} = this.props
		// cancel any ongoing debouncers
		if (this.cancelSync) {
			this.cancelSync()
		}
		// call the safe sync
		await safeSync()
		// Schedule next sync
		this.cancelSync = debounce('syncStorage', this.syncStorage, 15000)
	}

	render() {
		return null
	}
}

StorageManager.propTypes = {
	setCredentials                  : PropTypes.func,
	setPrograms                     : PropTypes.func,
	setRemoteMirror                 : PropTypes.func,
	setStatus                       : PropTypes.func,
	setUser                         : PropTypes.func,
	safeUpdateProgram               : PropTypes.func,
	removeProgramByIdAndClearEditor : PropTypes.func,
	credentials                     : PropTypes.object,
	programs                        : PropTypes.object,
	remoteMirror                    : PropTypes.object,
	status                          : PropTypes.string,
	user                            : PropTypes.object,
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(StorageManager)

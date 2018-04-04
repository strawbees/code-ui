import React from 'react'
import { connect } from 'react-redux'
import RemoteStorage from 'remotestoragejs'
import RemoteStorageDocuments from 'remotestorage-module-documents'
import RemoteStorageWidget from 'remotestorage-widget'
import { registerRemoteStorage } from 'src/utils/storage'
import * as storageActions from 'src/actions/storage'
import storageManagerContainerSelector from 'src/selectors/containers/storageManagerContainerSelector'
import autobindDispatchToProps from 'src/utils/autobindDispatchToProps'

class StorageManagerContainer extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}
	componentDidMount() {
		const {
			setReady,
			// setPrograms,
			addProgram,
			updateProgram,
			removeProgram,
			removeAllPrograms
		} = this.props

		RemoteStorageDocuments.name = 'strawbeescode'
		const rs = new RemoteStorage({
			changeEvents : {
				local     : true,
				window    : true,
				remote    : true,
				conflicts : true
			},
			// logging : true,
			modules : [RemoteStorageDocuments]
		})
		registerRemoteStorage(rs)
		rs.setApiKeys({
			dropbox : 'zd6wx3xxewwjdf5',
			// googledrive : '797731471383-guaj6k58h14fp8g787o210m533m5scng.apps.googleusercontent.com'
		})
		rs.access.claim('strawbeescode', 'rw')
		rs.caching.enable('/strawbeescode/')
		const flowClient = rs.strawbeescode.privateList('flow')
		const scratchClient = rs.strawbeescode.privateList('scratch')
		const textClient = rs.strawbeescode.privateList('text')

		// hookup to storage actions
		// const setClientValues = (mode, values) => {
		// 	const data = Object.entries(values).reduce((acc, entry) => {
		// 		const [id, value] = entry
		// 		acc[id] = value
		// 		delete acc[id]['@context']
		// 		return acc
		// 	}, {})
		// 	setPrograms({
		// 		mode,
		// 		data
		// 	})
		// }
		rs.on('ready', async () => {
			// fetch all currently stored programs
			// const [
			// 	flowValues,
			// 	scratchValues,
			// 	textValues
			// ] = await Promise.all([
			// 	flowClient.getAll(),
			// 	scratchClient.getAll(),
			// 	textClient.getAll()
			// ])
			// setClientValues('flow', flowValues)
			// setClientValues('scratch', scratchValues)
			// setClientValues('text', textValues)
			// set storage as ready
			setReady(true)
		})
		rs.on('disconnected', () => {
			// remove all programs
			removeAllPrograms()
			// mark the storage as not ready
			setReady(false)
		})
		const handleClientChange = mode => e => {
			const data = {
				...e.newValue
			}
			delete data['@context']
			const id = e.relativePath
			if (e.newValue && !e.oldValue) {
				addProgram({
					mode,
					id,
					data
				})
			} else if (!e.newValue && e.oldValue) {
				removeProgram({
					mode,
					id
				})
			} else if (e.newValue && e.oldValue) {
				updateProgram({
					mode,
					id,
					data
				})
			}
		}
		flowClient.on('change', handleClientChange('flow'))
		scratchClient.on('change', handleClientChange('scratch'))
		textClient.on('change', handleClientChange('text'))

		const widget = new RemoteStorageWidget(rs, {
			leaveOpen : true
		})
		widget.attach('remotestorage-widget-container')
	}

	render() {
		return null
	}
}

const mapStateToProps = storageManagerContainerSelector
const mapDispatchToProps = autobindDispatchToProps(storageActions)

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(StorageManagerContainer)

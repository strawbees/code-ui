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

		const modes = ['flow', 'scratch', 'text']
		modes.forEach(mode => {
			const client = rs.strawbeescode.privateList(mode)
			client.on('change', ({ newValue, oldValue, relativePath }) => {
				const data = { ...newValue }
				delete data['@context']
				const id = relativePath
				if (newValue && !oldValue) {
					addProgram({ mode, id, data })
				} else if (!newValue && oldValue) {
					removeProgram({ mode, id })
				} else if (newValue && oldValue) {
					updateProgram({ mode, id, data })
				}
			})
		})

		// hookup to storage actions
		rs.on('ready', async () => {
			setReady(true)
		})
		rs.on('disconnected', () => {
			// remove all programs
			removeAllPrograms()
			// mark the storage as not ready
			setReady(false)
		})
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

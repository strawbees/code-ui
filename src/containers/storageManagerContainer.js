import React from 'react'
import { connect } from 'react-redux'
import RemoteStorage from 'remotestoragejs'
import RemoteStorageDocuments from 'remotestorage-module-documents'
import RemoteStorageWidget from 'remotestorage-widget'
import storage from 'src/utils/storage'
import * as storageActions from 'src/actions/storage'
import storageManagerContainerSelector from 'src/selectors/containers/storageManagerContainerSelector'
import autobindDispatchToProps from 'src/utils/autobindDispatchToProps'

class StorageManagerContainer extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
	}
	componentDidMount() {
		RemoteStorageDocuments.name = 'strawbeescode'
		const rs = new RemoteStorage({
			changeEvents : {
				local     : true,
				window    : true,
				remote    : true,
				conflicts : true
			},
			logging : true,
			modules : [RemoteStorageDocuments]
		})
		rs.setApiKeys({
			//dropbox     : 'zd6wx3xxewwjdf5',
			//googledrive : '797731471383-guaj6k58h14fp8g787o210m533m5scng.apps.googleusercontent.com'
		})
		rs.access.claim('strawbeescode', 'rw')
		rs.caching.enable('/strawbeescode/')
		const flowClient = rs.strawbeescode.privateList('flow')
		const scratchClient = rs.strawbeescode.privateList('scratch')
		const textClient = rs.strawbeescode.privateList('text')

		flowClient.on('change', e => console.log('flow', e))
		scratchClient.on('change', e => console.log('scratch', e))
		textClient.on('change', e => console.log('text', e))

		rs.on('ready', async () => {
			console.log('rs ready')
			// const doc = await flowClient.add({ test : 'aaaa'})
			//await flowClient.remove('')
			//console.log(doc)
			// const all = await flowClient.getAll()
			// console.log(all)
		})
		rs.on('disconnected', () => console.log('rs disconnected'))

		//const widget = new RemoteStorageWidget(rs, {
		//	leaveOpen : true
		//})
		//widget.attach('remotestorage-widget-container')
	}
	static getDerivedStateFromProps({ localStorage }) {
		if (localStorage) {
			storage.set(localStorage)
		}
		return null
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

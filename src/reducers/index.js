import { combineReducers } from 'redux'
import setup from 'src/reducers/setup'
import storage from 'src/reducers/storage'
import qbmidi from 'src/reducers/qbmidi'
import editor from 'src/reducers/editor'
import modal from 'src/reducers/modal'
import compiler from 'src/reducers/compiler'
import uploader from 'src/reducers/uploader'
import flowEditor from 'src/editors/flow/reducer'

export default combineReducers({
	setup,
	qbmidi,
	storage,
	editor,
	modal,
	compiler,
	uploader,
	flowEditor,
})

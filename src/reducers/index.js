import { combineReducers } from 'redux'
import compiler from 'src/reducers/compiler'
import editor from 'src/reducers/editor'
import flowEditor from 'src/editors/flow/reducer'
import modal from 'src/reducers/modal'
import qbmidi from 'src/reducers/qbmidi'
import qbserial from 'src/reducers/qbserial'
import setup from 'src/reducers/setup'
import simulator from 'src/simulator/reducer'
import storage from 'src/reducers/storage'
import ui from 'src/reducers/ui'
import uploader from 'src/reducers/uploader'

export default combineReducers({
	compiler,
	editor,
	flowEditor,
	modal,
	qbmidi,
	qbserial,
	setup,
	simulator,
	storage,
	ui,
	uploader,
})

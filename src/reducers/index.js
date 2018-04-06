import { combineReducers } from 'redux'
import setup from 'src/reducers/setup'
import storage from 'src/reducers/storage'
import qbmidi from 'src/reducers/qbmidi'
import editor from 'src/reducers/editor'

export default combineReducers({
	setup,
	qbmidi,
	storage,
	editor
})

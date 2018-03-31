import { combineReducers } from 'redux'
import setup from 'src/reducers/setup'
import qbmidi from 'src/reducers/qbmidi'

export default combineReducers({
	...setup,
	...qbmidi
})

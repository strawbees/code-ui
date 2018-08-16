import { combineReducers } from 'redux'
import {
	UI_EXPAND_ACCOUNT_SETTINGS,
	UI_COLLAPSE_ACCOUNT_SETTINGS,
} from 'src/constants/actionTypes'

const accountSettingsOpen = (state = false, { type }) => {
	switch (type) {
		case UI_EXPAND_ACCOUNT_SETTINGS:
			return true
		case UI_COLLAPSE_ACCOUNT_SETTINGS:
			return false
		default:
			return state
	}
}

export default combineReducers({
	accountSettingsOpen,
})

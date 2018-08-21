import { combineReducers } from 'redux'
import {
	UI_EXPAND_ACCOUNT_SETTINGS,
	UI_COLLAPSE_ACCOUNT_SETTINGS,
	UI_HIDE_GLOBAL_BANNER,
	UI_SHOW_GLOBAL_BANNER,
	UI_SET_HIDDEN_GLOBAL_BANNERS,
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
const hiddenGlobalBanners = (state = {}, { type, payload }) => {
	switch (type) {
		case UI_HIDE_GLOBAL_BANNER:
			return {
				...state,
				[payload] : true
			}
		case UI_SHOW_GLOBAL_BANNER: {
			const newState = { ...state }
			delete newState[payload]
			return newState
		}
		case UI_SET_HIDDEN_GLOBAL_BANNERS: {
			return payload.reduce((acc, id) => {
				acc[id] = true
				return acc
			}, {})
		}

		default:
			return state
	}
}

export default combineReducers({
	accountSettingsOpen,
	hiddenGlobalBanners,
})

import { combineReducers } from 'redux'
import generateReducer from 'src/utils/generateReducer'
import {
	SETUP_SET,
	SETUP_SET_CODING_CARDS,
	UI_EXPAND_ACCOUNT_SETTINGS,
	UI_COLLAPSE_ACCOUNT_SETTINGS,
	UI_HIDE_GLOBAL_BANNER,
	UI_SHOW_GLOBAL_BANNER,
	UI_SET_HIDDEN_GLOBAL_BANNERS,
	UI_SET_CODING_CARDS_FLOW_FILTER_IDS,
	UI_SET_CODING_CARDS_BLOCK_FILTER_IDS,
	UI_SET_CODING_CARDS_FLOW_CURRENT_CARD_ID,
	UI_SET_CODING_CARDS_BLOCK_CURRENT_CARD_ID,
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
				[payload] : true,
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
const codingCardsFlowFilterIds = (state = [], { type, payload }) => {
	switch (type) {
		case UI_SET_CODING_CARDS_FLOW_FILTER_IDS:
			return payload
		case SETUP_SET_CODING_CARDS:
			return (
				payload &&
				payload.hardware &&
				Object.keys(payload.hardware)
			) || []
		case SETUP_SET:
			if (typeof payload.codingCards !== 'undefined') {
				return (
					payload &&
					payload.codingCards &&
					payload.codingCards.hardware &&
					Object.keys(payload.codingCards.hardware)
				) || []
			}
			return state
		default:
			return state
	}
}
const codingCardsBlockFilterIds = (state = [], { type, payload }) => {
	switch (type) {
		case UI_SET_CODING_CARDS_BLOCK_FILTER_IDS:
			return payload
		case SETUP_SET_CODING_CARDS:
			return (
				payload &&
				payload.hardware &&
				Object.keys(payload.hardware)
			) || []
		case SETUP_SET:
			if (typeof payload.codingCards !== 'undefined') {
				return (
					payload &&
					payload.codingCards &&
					payload.codingCards.hardware &&
					Object.keys(payload.codingCards.hardware)
				) || []
			}
			return state
		default:
			return state
	}
}
const codingCardsFlowCurrentCardId = generateReducer(UI_SET_CODING_CARDS_FLOW_CURRENT_CARD_ID, null)
const codingCardsBlockCurrentCardId = generateReducer(UI_SET_CODING_CARDS_BLOCK_CURRENT_CARD_ID, null)

export default combineReducers({
	accountSettingsOpen,
	hiddenGlobalBanners,
	codingCardsFlowFilterIds,
	codingCardsBlockFilterIds,
	codingCardsFlowCurrentCardId,
	codingCardsBlockCurrentCardId,
})

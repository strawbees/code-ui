import generateAction from 'src/utils/generateAction'
import * as browserStorage from 'src/utils/browserStorage'

import {
	UI_COLLAPSE_ACCOUNT_SETTINGS,
	UI_EXPAND_ACCOUNT_SETTINGS,
	UI_HIDE_GLOBAL_BANNER,
	UI_SHOW_GLOBAL_BANNER,
	UI_SET_HIDDEN_GLOBAL_BANNERS,
	UI_SET_CODING_CARDS_FLOW_FILTER_IDS,
	UI_SET_CODING_CARDS_BLOCK_FILTER_IDS,
} from 'src/constants/actionTypes'

export const setCodingCardsFlowFilterIds = generateAction(UI_SET_CODING_CARDS_FLOW_FILTER_IDS)
export const setCodingCardsBlockFilterIds = generateAction(UI_SET_CODING_CARDS_BLOCK_FILTER_IDS)
export const expandAccountSettings = generateAction(UI_EXPAND_ACCOUNT_SETTINGS)
export const collapseAccountSettings = generateAction(UI_COLLAPSE_ACCOUNT_SETTINGS)
export const hideGlobalBanner = generateAction(UI_HIDE_GLOBAL_BANNER)
export const showGlobalBanner = generateAction(UI_SHOW_GLOBAL_BANNER)
export const setHiddenGlobalBanners = generateAction(UI_SET_HIDDEN_GLOBAL_BANNERS)

export const persistentHideGlobalBanner = (id) => async (dispatch) => {
	browserStorage.set('hiddenGlobalBanners', id, true)
	dispatch(hideGlobalBanner(id))
}

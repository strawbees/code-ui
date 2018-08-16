import generateAction from 'src/utils/generateAction'
import {
	UI_COLLAPSE_ACCOUNT_SETTINGS,
	UI_EXPAND_ACCOUNT_SETTINGS,
} from 'src/constants/actionTypes'

export const expandAccountSettings = generateAction(UI_EXPAND_ACCOUNT_SETTINGS)
export const collapseAccountSettings = generateAction(UI_COLLAPSE_ACCOUNT_SETTINGS)

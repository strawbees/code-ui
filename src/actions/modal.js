import generateAction from 'src/utils/generateAction'
import {
	MODAL_SHOW_MODAL,
	MODAL_HIDE_MODAL,
	MODAL_SET_CONTENT,
	MODAL_SET_ON_REQUEST_CLOSE
} from 'src/constants/actionTypes'

export const showModal = generateAction(MODAL_SHOW_MODAL)
export const hideModal = generateAction(MODAL_HIDE_MODAL)
export const setModalContent = generateAction(MODAL_SET_CONTENT)
export const setModalOnRequestClose = generateAction(MODAL_SET_ON_REQUEST_CLOSE)

export const openModal = (content = null, onRequestClose) => (dispatch) => {
	const hideModalAction = () => dispatch(hideModal())
	dispatch(setModalOnRequestClose(onRequestClose || hideModalAction))
	dispatch(setModalContent(content))
	dispatch(showModal())
}

import Dialog from 'src/components/dialog'
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
	dispatch(setModalOnRequestClose(onRequestClose))
	dispatch(setModalContent(content))
	dispatch(showModal())
}
export const closeModal = () => (dispatch) => {
	dispatch(setModalOnRequestClose(null))
	dispatch(setModalContent(null))
	dispatch(hideModal())
}
export const safeOpenModal = (content = null) => async (dispatch) =>
	new Promise(resolve => {
		const closeModalAndResolve = () => {
			dispatch(closeModal())
			resolve()
		}
		dispatch(setModalOnRequestClose(closeModalAndResolve))
		dispatch(setModalContent(content))
		dispatch(showModal())
	})

export const safeOpenDialogModal = (dialogProps = {}, content = null) => (dispatch) =>
	new Promise((resolve, reject) => {
		const onConfirm = () => {
			if (dialogProps.onConfirm) {
				dialogProps.onConfirm()
			}
			dispatch(closeModal())
			resolve()
		}
		const onCancel = () => {
			if (dialogProps.onCancel) {
				dialogProps.onCancel()
			}
			dispatch(closeModal())
			reject()
		}
		dispatch(setModalOnRequestClose(onCancel))
		dispatch(setModalContent(
			<Dialog
				{...dialogProps}
				onConfirm={onConfirm}
				onCancel={onCancel}>
				{content}
			</Dialog>
		))
		dispatch(showModal())
	})

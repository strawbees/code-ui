import DialogContainer from 'src/containers/dialogContainer'
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
	const hideModalAction = () => dispatch(closeModal())
	dispatch(setModalOnRequestClose(onRequestClose || hideModalAction))
	dispatch(setModalContent(content))
	dispatch(showModal())
}

export const closeModal = () => (dispatch) => {
	dispatch(setModalOnRequestClose(null))
	dispatch(setModalContent(null))
	dispatch(hideModal())
}

export const openDialogModal = (content = null, dialogProps) => (dispatch) => {
	const onConfirm = () => {
		if (dialogProps.onConfirm) {
			dialogProps.onConfirm()
		}
		dispatch(closeModal())
	}
	const onCancel = () => {
		if (dialogProps.onCancel) {
			dialogProps.onCancel()
		}
		dispatch(closeModal())
	}
	dispatch(setModalOnRequestClose(onCancel))
	dispatch(setModalContent(
		<DialogContainer
			{...dialogProps}
			onConfirm={onConfirm}
			onCancel={onCancel}>
			{content}
		</DialogContainer>
	))
	dispatch(showModal())
}

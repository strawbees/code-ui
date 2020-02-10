import {
	safeOpenModal,
} from 'src/actions/modal'
import CodingCardsBrowserContainer from 'src/containers/codingCardsBrowserContainer'

export const modalViewCodingCards = (type) => async (dispatch) =>
	dispatch(safeOpenModal(
		<CodingCardsBrowserContainer
			type={type}>
		</CodingCardsBrowserContainer>
	))

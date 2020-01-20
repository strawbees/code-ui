import {
	safeOpenModal,
} from 'src/actions/modal'

import CodingCardsDirectoryContainer from 'src/containers/codingCardsDirectoryContainer'

export const modalViewCodingCards = (type) => async (dispatch) =>
	dispatch(safeOpenModal(
		<CodingCardsDirectoryContainer
			type={type}>
		</CodingCardsDirectoryContainer>
	))

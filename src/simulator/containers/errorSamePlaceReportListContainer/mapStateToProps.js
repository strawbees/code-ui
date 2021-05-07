import { createSelector } from 'reselect'
import placeConstantsWithSamePlaceErrorStringSelector from '../../selectors/placeConstantsWithSamePlaceErrorStringSelector'

const mapStateToProps = () => createSelector(
	[
		placeConstantsWithSamePlaceErrorStringSelector(),
	],
	(
		placeConstantsString,
	) => ({
		placeConstantsString,
	})
)

export default mapStateToProps

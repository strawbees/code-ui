import { createSelector } from 'reselect'
import placeConstantsWithSamePlaceErrorSelector from './placeConstantsWithSamePlaceErrorSelector'

const placeConstantsWithSamePlaceErrorStringSelector = () => createSelector(
	[
		placeConstantsWithSamePlaceErrorSelector(),
	],
	(
		constants,
	) => JSON.stringify(constants)
)

export default placeConstantsWithSamePlaceErrorStringSelector

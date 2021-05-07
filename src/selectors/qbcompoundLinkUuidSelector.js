import { createSelector } from 'reselect'
import qbcompoundLinkSelector from 'src/selectors/qbcompoundLinkSelector'

const qbcompoundLinkUuidSelector = () => createSelector(
	[
		qbcompoundLinkSelector(),
	],
	(
		{
			uuid,
		},
	) => uuid
)

export default qbcompoundLinkUuidSelector

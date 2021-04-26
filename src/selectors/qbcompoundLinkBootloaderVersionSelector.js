import { createSelector } from 'reselect'
import qbcompoundLinkUuidSelector from 'src/selectors/qbcompoundLinkUuidSelector'

const qbcompoundLinkBootloaderVersionSelector = () => createSelector(
	[
		qbcompoundLinkUuidSelector(),
	],
	(
		uuid
	) => Number.parseInt(uuid.slice(2, 4), 10)
)

export default qbcompoundLinkBootloaderVersionSelector

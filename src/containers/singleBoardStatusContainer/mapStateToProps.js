import { createSelector } from 'reselect'
import qbcompoundLinkSelector from 'src/selectors/qbcompoundLinkSelector'

const mapStateToProps = () => createSelector(
	[
		qbcompoundLinkSelector(),
	],
	({
		hardwareInterface,
		midi,
		uuid,
		bootloader,
		uploading,
		enteringBootloaderMode,
		exitingBootloaderMode,
	}) => {
		const result = {
			uuid
		}
		if (hardwareInterface === 'midi' && !midi) {
			result.status = 'problem'
		} else {
			result.status = (uploading || enteringBootloaderMode || exitingBootloaderMode)
				? 'busy'
				: bootloader
					? 'bootloader'
					: 'ok'
		}
		return result
	}
)

export default mapStateToProps

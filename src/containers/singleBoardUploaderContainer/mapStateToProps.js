import { createSelector } from 'reselect'
import qbcompoundLinkSelector from 'src/selectors/qbcompoundLinkSelector'
import uploaderEntryUploadingSelector from 'src/selectors/uploaderEntryUploadingSelector'
import uploaderEntrySuccessSelector from 'src/selectors/uploaderEntrySuccessSelector'
import uploaderEntryFormatedErrorSelector from 'src/selectors/uploaderEntryFormatedErrorSelector'
import uploaderBusySelector from 'src/selectors/uploaderBusySelector'

const mapStateToProps = () => createSelector(
	[
		qbcompoundLinkSelector(),
		uploaderEntryUploadingSelector(),
		uploaderEntrySuccessSelector(),
		uploaderEntryFormatedErrorSelector(),
		uploaderBusySelector(),
	],
	(
		{
			hardwareInterface,
			uuid,
			midi,
			serial,
			bootloader,
		},
		uploading,
		uploadSuccess,
		uploadError,
		uploaderBusy,
	) => ({
		hardwareInterface,
		uuid,
		midi,
		serial,
		bootloader,
		uploading,
		uploadSuccess,
		uploadError,
		uploaderBusy,
	})
)

export default mapStateToProps

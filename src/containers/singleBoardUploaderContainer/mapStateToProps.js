import { createSelector } from 'reselect'
import qbmidiLinkSelector from 'src/selectors/qbmidiLinkSelector'
import uploaderEntryUploadingSelector from 'src/selectors/uploaderEntryUploadingSelector'
import uploaderEntrySuccessSelector from 'src/selectors/uploaderEntrySuccessSelector'
import uploaderEntryFormatedErrorSelector from 'src/selectors/uploaderEntryFormatedErrorSelector'
import uploaderBusySelector from 'src/selectors/uploaderBusySelector'

export default createSelector(
	[
		qbmidiLinkSelector,
		uploaderEntryUploadingSelector,
		uploaderEntrySuccessSelector,
		uploaderEntryFormatedErrorSelector,
		uploaderBusySelector,
	],
	(
		{
			uuid,
			midi,
			bootloader
		},
		uploading,
		uploadSuccess,
		uploadError,
		uploaderBusy,
	) => ({
		uuid,
		midi,
		bootloader,
		uploading,
		uploadSuccess,
		uploadError,
		uploaderBusy,
	})
)

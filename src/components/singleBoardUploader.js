import PropTypes from 'prop-types'
import Spinner from 'src/components/spinner'
import S from 'src/containers/sManager'

const SingleBoardUpload = ({
	onUploadPress,
	uuid,
	midi,
	bootloader,
	uploading,
	hex,
	uploaderBusy,
	uploadSuccess,
	uploadError
}) =>
	<div className='root singleBoardUpload'>
		<style jsx>{`
			.root {
				display: flex;
				flex-direction: row;
				border: solid 1px;
			}
		`}</style>
		<div className='uuid'>
			{uuid}
		</div>
		{bootloader &&
			<div className='recovery-mode'>
				<S value='ui.board.bootloader_mode_label'/>
			</div>
		}
		{midi ?
			// Board is midi compatible
			hex ?
				// There's a hex avaiable
				uploading ?
					// There's an ongoing upload
					<Spinner />
					:
					uploaderBusy ?
						// Uploader is busy
						<div>
							<S value='ui.board.upload.uploader_busy'/>
						</div>
						:
						// Uploader is avaiable
						(!uploadSuccess && !uploadError) ?
							// Upload hasn't start yet
							<button onClick={onUploadPress}>
								<S value='ui.editor.upload'/>
							</button>
							:
							// Upload has finished
							uploadSuccess ?
								// Sucessful upload
								<div>
									<S value='ui.board.upload.success'/>
								</div>
								:
								// Upload error
								<div>
									<button onClick={onUploadPress}>
										<S value='ui.editor.upload'/>
									</button>
								</div>
				:
				// There's no hex to be uploaded
				<div>
					<S value='ui.board.upload.no_hex'/>
				</div>
			:
			// Board is not midi compatible
			<div>
				<S value='ui.board.upload.no_hex'/>
			</div>
		}
		{uploading &&
			<div>
				<S value='ui.board.upload.disconnect_warning'/>
			</div>
		}
	</div>

SingleBoardUpload.defaultProps = {
}

SingleBoardUpload.propTypes = {
	onUploadPress : PropTypes.func,
	uuid          : PropTypes.string,
	midi          : PropTypes.bool,
	uploaderBusy  : PropTypes.bool,
	bootloader    : PropTypes.bool,
	uploading     : PropTypes.bool,
	hex           : PropTypes.string,
	uploadSuccess : PropTypes.bool,
	uploadError   : PropTypes.string,
}

export default SingleBoardUpload

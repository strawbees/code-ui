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
}) =>
	<div className={`root singleBoardUpload ${midi ? 'midi' : 'not-midi'} ${bootloader ? 'bootloader' : ''}`}>
		<style jsx>{`
			.root {
				display: flex;
				flex-direction: row;
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
					// Upload hasn't start yet
					<button onClick={onUploadPress}>
						<S value='ui.editor.upload'/>
					</button>
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
	bootloader    : PropTypes.bool,
	uploading     : PropTypes.bool,
	hex           : PropTypes.string,
}

export default SingleBoardUpload

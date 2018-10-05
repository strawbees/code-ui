import PropTypes from 'prop-types'
import Markdown from 'src/components/markdown'
import Message from 'src/components/message'
import SingleBoardStatus from 'src/components/singleBoardStatus'
import SingleBoardUploaderContainer from 'src/containers/singleBoardUploaderContainer'
import UploaderDependenciesContainer from 'src/containers/uploaderDependenciesContainer'
import S from 'src/containers/sManager'

const UploadArea = ({
	boardIds,
	hex,
	compilerError,
	uploaderError
}) =>
	<div className='root uploadArea'>
		<style jsx>{`
			.root {
				display: flex;
				flex-direction: column;
				width: 26rem;
			}
			.compilation-status {
				display: flex;
				flex-direction: row;
				align-items: center;
				margin-bottom: 0.5rem;
			}
			.root :global(>.message) {
				margin-bottom: 0.5rem;
			}
			.root :global(>.not-detected) :global(.singleBoardStatus) {
				margin-left: -1rem;
			}
			.root :global(.singleBoardUploader) {
				margin-bottom: 0.5rem;
			}
			.root :global(.singleBoardUploader::last-child) {
				margin-bottom: 0;
			}
			@media (max-width: 450px) {
				.root {
					width: auto;
				}
			}
		`}</style>
		<div className='title global-type global-type-h3'>
			<S value='ui.dialog.upload.title' />
		</div>
		{(!hex && compilerError) &&
			<Message type='error'>
				<Markdown source={compilerError}/>
			</Message>
		}
		{uploaderError &&
			<Message type='error'>
				<Markdown source={uploaderError}/>
			</Message>
		}
		{boardIds.length === 0 &&
			<UploaderDependenciesContainer hideTitle={true}/>
		}
		{boardIds.length > 0 && boardIds.map(runtimeId =>
			<SingleBoardUploaderContainer
				key={runtimeId}
				runtimeId={runtimeId}
				hex={hex}
			/>
		)}
	</div>

UploadArea.defaultProps = {
	boardIds : []
}

UploadArea.propTypes = {
	boardIds      : PropTypes.arrayOf(PropTypes.string),
	hex           : PropTypes.string,
	compilerError : PropTypes.string,
	uploaderError : PropTypes.string
}

export default UploadArea

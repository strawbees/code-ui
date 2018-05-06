import PropTypes from 'prop-types'
import Spinner from 'src/components/spinner'
import SingleBoardUploaderContainer from 'src/containers/singleBoardUploaderContainer'


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
			}
		`}</style>
		{(!hex && !compilerError) &&
			<div>
				compiling
				<Spinner/>
			</div>
		}
		{(!hex && compilerError) &&
			<div>{compilerError}</div>
		}
		{uploaderError &&
			<div>{uploaderError}</div>
		}
		<div>
			{boardIds.length === 0 &&
				<div className="not-connected">
					no boardIds detected
				</div>
			}
			{boardIds.length > 0 && boardIds.map(runtimeId =>
				<SingleBoardUploaderContainer
					key={runtimeId}
					runtimeId={runtimeId}
					hex={hex}
				/>
			)}
		</div>
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

import PropTypes from 'prop-types'
import Spinner from 'src/components/spinner'
import SingleBoardUploaderContainer from 'src/containers/singleBoardUploaderContainer'


const UploadArea = ({
	boards,
	hex,
	error
}) =>
	<div className='root uploadArea'>
		<style jsx>{`
			.root {
				display: flex;
				flex-direction: column;
			}
		`}</style>
		{(!hex && !error) &&
			<div>
				compiling
				<Spinner/>
			</div>
		}
		{(!hex && error) &&
			<div>{error}</div>
		}
		<div>
			{boards.length === 0 &&
				<div className="not-connected">
					no boards detected
				</div>
			}
			{boards.length > 0 && boards.map(runtimeId =>
				<SingleBoardUploaderContainer
					key={runtimeId}
					runtimeId={runtimeId}
					hex={hex}
				/>
			)}
		</div>
	</div>

UploadArea.defaultProps = {
	boards : []
}

UploadArea.propTypes = {
	boards : PropTypes.arrayOf(PropTypes.string),
	hex    : PropTypes.string,
	error  : PropTypes.string
}

export default UploadArea

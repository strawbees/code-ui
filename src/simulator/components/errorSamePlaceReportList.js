import PropTypes from 'prop-types'
import ErrorSamePlaceReportContainer from '../containers/errorSamePlaceReportContainer'

const ErrorSamePlaceReportList = ({
	placeConstantsString,
}) => {
	const placeConstants = JSON.parse(placeConstantsString)
	return (
		<div className='root errorSamePlaceReportList'>
			<style jsx>{`
				.root {
					display: flex;
					flex-direction: column;
					align-items: flex-start;
				}
			`}</style>
			{placeConstants.map((constant, i) =>
				<ErrorSamePlaceReportContainer key={i} place={constant}/>
			)}
		</div>
	)
}
ErrorSamePlaceReportList.defaultProps = {
	placeConstantsString : '[]',
}

ErrorSamePlaceReportList.propTypes = {
	placeConstantsString : PropTypes.string,
}

export default ErrorSamePlaceReportList

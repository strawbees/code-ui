import PropTypes from 'prop-types'
import ErrorSamePlace from './errorSamePlace'

const ErrorSamePlaceList = ({
	placeConstantsString,
}) => {
	const placeConstants = JSON.parse(placeConstantsString)
	return (
		<>
			<style jsx>{`

			`}</style>
			{placeConstants.map((constant, i) =>
				<ErrorSamePlace key={i} place={constant}/>
			)}
		</>
	)
}
ErrorSamePlaceList.defaultProps = {
	placeConstantsString : '[]',
}

ErrorSamePlaceList.propTypes = {
	placeConstantsString : PropTypes.string,
}

export default ErrorSamePlaceList

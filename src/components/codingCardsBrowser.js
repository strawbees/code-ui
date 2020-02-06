import PropTypes from 'prop-types'
import CodingCardsBrowserList from 'src/components/codingCardsBrowserList'
import CodingCardsBrowserCardContainer from 'src/containers/codingCardsBrowserCardContainer'

const CodingCardsBrowser = ({
	type,
	title,
	cardIds,
	currentCardId,
	setCurrentCardId,
}) => (
	<>
		{!currentCardId &&
			<CodingCardsBrowserList
				type={type}
				title={title}
				cardIds={cardIds}
				setCurrentCardId={setCurrentCardId}
			/>
		}
		{currentCardId &&
			<CodingCardsBrowserCardContainer
				type={type}
				id={currentCardId}
			/>
		}
	</>
)

CodingCardsBrowser.defaultProps = {
	title         : '',
	cardIds       : [],
	currentCardId : null,
}

CodingCardsBrowser.propTypes = {
	type : PropTypes.oneOf([
		'flow',
		'block'
	]),
	title            : PropTypes.string,
	cardIds          : PropTypes.arrayOf(PropTypes.string),
	currentCardId    : PropTypes.string,
	setCurrentCardId : PropTypes.string,
}

export default CodingCardsBrowser

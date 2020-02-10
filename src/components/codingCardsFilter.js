import PropTypes from 'prop-types'
import CodingCardsFilterItemContainer from 'src/containers/codingCardsFilterItemContainer'

const CodingCardsFilter = ({
	filterIds,
	currentFilterIds,
	setFilterIds,
}) => {
	const resolveAndSetFilters = (id) => {
		const filters = currentFilterIds.splice(0)
		if (filters.indexOf(id) === -1) {
			filters.push(id)
		} else {
			filters.splice(filters.indexOf(id), 1)
		}
		setFilterIds(filters)
	}
	return (
		<div className='root codingCardsFilter'>
			<style jsx>{`
				.items {
					display: flex;
					flex-direction: row;
					justify-content: center;
				}
			`}</style>

			<div className='items'>
				{filterIds && filterIds.length > 0 &&
					filterIds.map(id =>
						<CodingCardsFilterItemContainer
							id={id}
							key={id}
							onClick={() => resolveAndSetFilters(id)}
							selected={currentFilterIds.indexOf(id) !== -1}
						/>
					)
				}
			</div>
		</div>
	)
}

CodingCardsFilter.defaultProps = {
	filterIds        : [],
	currentFilterIds : [],
}

CodingCardsFilter.propTypes = {
	filterIds        : PropTypes.arrayOf(PropTypes.string),
	currentFilterIds : PropTypes.arrayOf(PropTypes.string),
	setFilterIds     : PropTypes.func,
}

export default CodingCardsFilter

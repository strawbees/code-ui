import PropTypes from 'prop-types'

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

			`}</style>

			{filterIds && filterIds.length > 0 &&
				filterIds.map(id =>
					<div
						key={id}
						onClick={() => resolveAndSetFilters(id)}>
						{id}{currentFilterIds.indexOf(id) !== -1 ? '(x)' : ''}
					</div>
				)
			}
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

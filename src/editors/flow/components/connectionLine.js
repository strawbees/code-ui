import PropTypes from 'prop-types'

const ConnectionLine = ({
	x1,
	x2,
	y1,
	y2,
}) => {
	const off = 17
	const diffX = x1 - x2
	const diffY = y1 - y2
	const d = Math.sqrt((diffX ** 2) + (diffY ** 2))
	const newD = d - off
	const newX = x1 - ((newD * (x1 - x2)) / d)
	const newY = y1 - ((newD * (y1 - y2)) / d)
	return (
		<line x1={x1} x2={newX} y1={y1} y2={newY} markerEnd="url(#arrow)"/>
	)
}


ConnectionLine.propTypes = {
	x1 : PropTypes.number,
	x2 : PropTypes.number,
	y1 : PropTypes.number,
	y2 : PropTypes.number,
}

export default ConnectionLine

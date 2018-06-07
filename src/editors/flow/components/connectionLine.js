import PropTypes from 'prop-types'

const ConnectionLine = ({
	x1,
	x2,
	y1,
	y2,
}) =>
	<line x1={x1} x2={x2} y1={y1} y2={y2}/>

ConnectionLine.propTypes = {
	x1 : PropTypes.number,
	x2 : PropTypes.number,
	y1 : PropTypes.number,
	y2 : PropTypes.number,
}

export default ConnectionLine

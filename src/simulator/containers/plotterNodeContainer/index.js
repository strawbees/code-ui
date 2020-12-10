import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PlotterNode from '../../components/plotterNode'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const PlotterNodeContainer = (props) =>
	<PlotterNode
		{...props}
	/>

const PlotterNodeContainerConnected = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(PlotterNodeContainer)

PlotterNodeContainerConnected.propTypes = {
	containerWidth : PropTypes.number,
	id             : PropTypes.string,
}

export default PlotterNodeContainerConnected

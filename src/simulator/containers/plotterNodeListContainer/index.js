import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PlotterNodeList from '../../components/plotterNodeList'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const PlotterNodeListContainer = (props) =>
	<PlotterNodeList
		{...props}
	/>

PlotterNodeListContainer.propTypes = {
	containerWidth : PropTypes.number,
}

const PlotterNodeListContainerConnected = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(PlotterNodeListContainer)

export default PlotterNodeListContainerConnected

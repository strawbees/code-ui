import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import NodePartsList from '../../components/nodePartsList'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const NodePartsListContainer = (props) =>
	<NodePartsList
		{...props}
	/>

NodePartsListContainer.propTypes = {
	adjustScale : PropTypes.number,
}

const NodePartsListContainerConnected = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(NodePartsListContainer)

export default NodePartsListContainerConnected

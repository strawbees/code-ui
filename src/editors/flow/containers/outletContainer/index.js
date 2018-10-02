import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Outlet from 'src/editors/flow/components/outlet'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const OutletContainer = (props) =>
	<Outlet {...props} />

OutletContainer.propTypes = {
	id         : PropTypes.string,
	instanceId : PropTypes.string,
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(OutletContainer)

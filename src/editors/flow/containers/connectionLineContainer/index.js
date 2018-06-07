import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ConnectionLine from 'src/editors/flow/components/connectionLine'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const ConnectionLineContainer = (props) =>
	<ConnectionLine {...props} />

ConnectionLineContainer.propTypes = {
	id : PropTypes.string,
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(ConnectionLineContainer)

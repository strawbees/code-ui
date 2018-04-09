import { connect } from 'react-redux'
import Header from 'src/components/header'
import mapStateToProps from './mapStateToProps'

export default connect(
	mapStateToProps
)(Header)

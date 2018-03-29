import { connect } from 'react-redux'
import Header from 'src/components/header'
import headerContainerSelector from 'src/selectors/headerContainerSelector'

const mapStateToProps = headerContainerSelector

export default connect(mapStateToProps)(Header)

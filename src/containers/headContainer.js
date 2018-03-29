import { connect } from 'react-redux'
import Head from 'src/components/head'
import headContainerSelector from 'src/selectors/containers/headContainerSelector'

const mapStateToProps = headContainerSelector

export default connect(mapStateToProps)(Head)

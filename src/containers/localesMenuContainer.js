import { connect } from 'react-redux'
import LocalesMenu from 'src/components/localesMenu'
import localesMenuContainerSelector from 'src/selectors/containers/localesMenuContainerSelector'

const mapStateToProps = localesMenuContainerSelector

export default connect(mapStateToProps)(LocalesMenu)

import { connect } from 'react-redux'
import BoardsStatus from 'src/components/boardsStatus'
import boardsStatusContainerSelector from 'src/selectors/containers/boardsStatusContainerSelector'

const mapStateToProps = boardsStatusContainerSelector

export default connect(mapStateToProps)(BoardsStatus)

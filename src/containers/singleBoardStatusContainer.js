import { connect } from 'react-redux'
import SingleBoardStatus from 'src/components/singleBoardStatus'
import singleBoardStatusContainerSelector from 'src/selectors/containers/singleBoardStatusContainerSelector'

const mapStateToProps = singleBoardStatusContainerSelector

export default connect(mapStateToProps)(SingleBoardStatus)

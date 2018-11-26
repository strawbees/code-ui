import { connect } from 'react-redux'
import PageDownload from 'src/components/pageDownload'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const PageDownloadContainer = (props) =>
	<PageDownload {...props}/>

export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(PageDownloadContainer)

import Package from 'root/package.json'
import BoardsStatusContainer from 'src/containers/boardsStatusContainer'

const Footer = () =>
	<div className='root footer'>
		<BoardsStatusContainer />
		<div className='version'>
			v{Package.version}
		</div>
	</div>

Footer.defaultProps = {}

Footer.propTypes = {}

export default Footer

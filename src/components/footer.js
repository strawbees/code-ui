import Package from 'root/package.json'
import tinycolor from 'tinycolor2'
import { PINK } from 'src/constants/colors'
import BoardsStatusContainer from 'src/containers/boardsStatusContainer'

const Footer = () =>
	<div className='root footer'>
		<style jsx>{`
			.root {
				display: flex;
				flex-direction: row;
				background-color: ${tinycolor(PINK).setAlpha(0.5).toRgbString()};
			}
		`}</style>
		<BoardsStatusContainer />
		<div className='version'>
			v{Package.version}
		</div>
	</div>

Footer.defaultProps = {}

Footer.propTypes = {}

export default Footer

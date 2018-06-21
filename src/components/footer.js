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
				align-items: center;
				padding: 0 0.5rem;
				background-color: ${tinycolor(PINK).setAlpha(0.5).toRgbString()};
				position: relative;
			}
			.root :global(>.boardsStatus) {
				margin-left: -0.5rem;
			}
			.version {
				position: absolute;
				bottom: 2px;
				right: 2px;
				font-family: Code;
				font-size: 6px;
				color: rgba(255,255,255,0.6);
			}
		`}</style>
		<BoardsStatusContainer />
		<div className='version'>
			{Package.version}
		</div>
	</div>

Footer.defaultProps = {}

Footer.propTypes = {}

export default Footer

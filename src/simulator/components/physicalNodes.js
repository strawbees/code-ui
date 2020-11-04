import PropTypes from 'prop-types'
import NodePartsListContainer from '../containers/nodePartsListContainer'
import Figure from './figure'
import QuirkbotSVG from '../assets/images/general/quirkbot.svg'

const PhysicalNodes = ({
	originScale,
	width,
	height,
	originOffsetX,
	originOffsetY,
}) =>
	<div className='root physicalNodes'>
		<style jsx>{`
			.root {
				position:relative;
				width: ${width}px;
				height: ${height}px;
				background-color:yellow;
				transform: scale(${0.5})
			}
			.origin {
				position: absolute;
				left: 50%;
				top: 50%;
				transform: scale(${originScale}) translate3d(${originOffsetX}px, ${originOffsetY}px, 0px);
			}
			.origin :global(> *) {
				position: absolute;
			}
		`}</style>
		<div className='origin'>
			<Figure svg={QuirkbotSVG} className='board'/>
			<NodePartsListContainer/>
		</div>
	</div>

PhysicalNodes.defaultProps = {
	originScale   : 1,
	originOffsetX : 0,
	originOffsetY : 0,
	width         : 500,
	height        : 500,
}

PhysicalNodes.propTypes = {
	originScale   : PropTypes.number,
	originOffsetX : PropTypes.number,
	originOffsetY : PropTypes.number,
	width         : PropTypes.number,
	height        : PropTypes.number,
}

export default PhysicalNodes

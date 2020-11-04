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
	containerWidth,
}) => {
	if (!containerWidth) return null
	const adjustScale = containerWidth / width
	return (
		<div className='root physicalNodes'>
			<style jsx>{`
				.root {
					position: relative;
					width: ${width * adjustScale}px;
					height: ${height * adjustScale}px;
					overflow: hidden;
					background-color: white;
				}
				.resize-area {
					position: absolute;
					left: calc(50% - ${width * 0.5}px);
					top: 0;
					width: ${width}px;
					height: ${height}px;
					transform: scale(${adjustScale});
					transform-origin: 50% 0%;
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
			<div className='resize-area'>
				<div className='origin'>
					<Figure svg={QuirkbotSVG} className='board'/>
					<NodePartsListContainer/>
				</div>
			</div>
		</div>
	)
}

PhysicalNodes.defaultProps = {
	originScale    : 1,
	originOffsetX  : 0,
	originOffsetY  : 0,
	width          : 500,
	height         : 500,
	containerWidth : null,
}

PhysicalNodes.propTypes = {
	originScale    : PropTypes.number,
	originOffsetX  : PropTypes.number,
	originOffsetY  : PropTypes.number,
	width          : PropTypes.number,
	height         : PropTypes.number,
	containerWidth : PropTypes.number,
}

export default PhysicalNodes

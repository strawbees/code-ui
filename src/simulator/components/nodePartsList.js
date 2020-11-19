import PropTypes from 'prop-types'
import NodePartResolverContainer from '../containers/nodePartResolverContainer'

const keyNodeTypes = ['KeyPress', 'KeySequence']

const NodePartsList = ({
	internalDataNodeIdsString,
	internalDataNodeTypesString,
	width,
	height,
	originOffsetY,
}) => {
	const internalDataNodeIds = JSON.parse(internalDataNodeIdsString)
	const internalDataNodeTypes = JSON.parse(internalDataNodeTypesString)
	const idsByType = {}
	internalDataNodeIds.forEach((id, i) => {
		const type = internalDataNodeTypes[i]
		if (!idsByType[type]) {
			idsByType[type] = []
		}
		idsByType[type].push(id)
	})
	const keyAreaHeight = 150

	const keyNodeIds = Object.keys(idsByType)
		.filter(type => keyNodeTypes.indexOf(type) !== -1)

	const otherNodeIds = Object.keys(idsByType)
		.filter(type => keyNodeTypes.indexOf(type) === -1)
	return (
		<>
			<style jsx>{`
				.key-nodes {
					position: absolute;
					background-color:rgba(155,1,0,0.3);
					width: ${width}px;
					height: ${keyAreaHeight}px;
					top: ${(height / 2) - originOffsetY - keyAreaHeight}px;
					left: -${width / 2}px;
				}
			`}</style>
			{keyNodeIds.length > 0 &&
				<div className='key-nodes'>
					{keyNodeIds.map((type) => idsByType[type].map((id) =>
						<NodePartResolverContainer key={id} id={id}/>
					))}
				</div>
			}
			{otherNodeIds.map((type) => idsByType[type].map((id) =>
				<NodePartResolverContainer key={id} id={id}/>
			))}
		</>
	)
}
NodePartsList.defaultProps = {
	internalDataNodeIdsString   : '[]',
	internalDataNodeTypesString : '[]',
	width                       : 500,
	height                      : 500,
	originOffsetY               : 0,
}

NodePartsList.propTypes = {
	internalDataNodeIdsString   : PropTypes.string,
	internalDataNodeTypesString : PropTypes.string,
	width                       : PropTypes.number,
	height                      : PropTypes.number,
	originOffsetY               : PropTypes.number,
}

export default NodePartsList

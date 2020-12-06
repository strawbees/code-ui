import PropTypes from 'prop-types'
import NodePartResolverContainer from '../containers/nodePartResolverContainer'

const keyNodeTypes = ['KeyPress', 'KeySequence']

const NodePartsList = ({
	internalDataNodeIdsString,
	internalDataNodeTypesString,
	width,
	height,
	originOffsetY,
	originOffsetX,
	adjustScale,
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
	const keyAreaHeight = 140

	const keyNodeIds = Object.keys(idsByType)
		.filter(type => keyNodeTypes.indexOf(type) !== -1)

	const otherNodeIds = Object.keys(idsByType)
		.filter(type => keyNodeTypes.indexOf(type) === -1)
	return (
		<>
			<style jsx>{`
				.key-nodes {
					position: absolute;
					width: ${width}px;
					height: ${keyAreaHeight}px;
					top: ${(height / 2) - originOffsetY - keyAreaHeight}px;
					left: -${(width / 2) + originOffsetX}px;
					overflow-x: scroll;
				}
				.key-nodes .container {
					display: flex;
					flex-direction: row;
					width: auto;
				}
			`}</style>
			{keyNodeIds.length > 0 &&
				<div className='key-nodes'>
					<div className='container'>
						{keyNodeIds.map((type) => idsByType[type].map((id) =>
							<NodePartResolverContainer
								key={id}
								id={id}
								adjustScale={adjustScale}
							/>
						))}
					</div>
				</div>
			}
			{otherNodeIds.map((type) => idsByType[type].map((id) =>
				<NodePartResolverContainer
					key={id}
					id={id}
					adjustScale={adjustScale}
				/>
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
	originOffsetX               : 0,
	adjustScale                 : 1,
}

NodePartsList.propTypes = {
	internalDataNodeIdsString   : PropTypes.string,
	internalDataNodeTypesString : PropTypes.string,
	width                       : PropTypes.number,
	height                      : PropTypes.number,
	originOffsetY               : PropTypes.number,
	originOffsetX               : PropTypes.number,
	adjustScale                 : PropTypes.number,
}

export default NodePartsList

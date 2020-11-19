import PropTypes from 'prop-types'
import NodePartResolverContainer from '../containers/nodePartResolverContainer'

const keyTypes = ['KeyPress', 'KeySequence']

const NodePartsList = ({
	internalDataNodeIdsString,
	internalDataNodeTypesString,
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

	return (
		<>
			<style jsx>{`
				.node-parts-by-type {
					position: absolute;
					z-index: 1;
				}
			`}</style>
			{Object.keys(idsByType).map((type) => {
				if (keyTypes.indexOf(type) !== -1) {
					return (
						<div className={`keys ${type}`} key={type}>
							{idsByType[type].map((id) =>
								<NodePartResolverContainer key={id} id={id}/>
							)}
						</div>
					)
				}
				return idsByType[type].map((id) =>
					<NodePartResolverContainer key={id} id={id}/>
				)
			})}
		</>
	)
}
NodePartsList.defaultProps = {
	internalDataNodeIdsString   : '[]',
	internalDataNodeTypesString : '[]',
}

NodePartsList.propTypes = {
	internalDataNodeIdsString   : PropTypes.string,
	internalDataNodeTypesString : PropTypes.string
}

export default NodePartsList

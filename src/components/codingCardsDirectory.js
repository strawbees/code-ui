import PropTypes from 'prop-types'
import CodingCardsFilterContainer from 'src/containers/codingCardsFilterContainer'
import SvgIcon from 'src/components/svgIcon'
import editorIcons from 'src/assets/icons/editors/small'

const CodingCardsDirectory = ({
	type,
	title,
	cardIds
}) => (
	<div className='root codingCardsDirectory'>
		<style jsx>{`
			.root {
				width: 600px;
			}
			.title-container {
				display: flex;
				flex-direction: row;
				align-items: center;
			}
			.title-container .title {
				margin-bottom: 0;
			}
			.title-container :global(>.svgIcon) {
				flex-shrink: 0;
				width: 3.5rem;
				height: 2.25rem;
				margin-right: 0.5rem;
			}
		`}</style>

		{title &&
			<div className='title-container'>
				{type &&
					<SvgIcon
						icon={editorIcons[type]}
					/>
				}
				<div className='title global-type global-type-h3'>
					{title}
				</div>
			</div>
		}
		<CodingCardsFilterContainer
			type={type}
		/>
		{cardIds && cardIds.length > 0 &&
			cardIds.map(id =>
				<div key={id}>{id}</div>
			)
		}
	</div>
)

CodingCardsDirectory.defaultProps = {
	title   : '',
	cardIds : [],
}

CodingCardsDirectory.propTypes = {
	type : PropTypes.oneOf([
		'flow',
		'block'
	]),
	title   : PropTypes.string,
	cardIds : PropTypes.arrayOf(PropTypes.string),
}

export default CodingCardsDirectory

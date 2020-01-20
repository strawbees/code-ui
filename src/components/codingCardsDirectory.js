import PropTypes from 'prop-types'
import SvgIcon from 'src/components/svgIcon'
import editorIcons from 'src/assets/icons/editors/small'

const CodingCardsDirectory = ({
	type,
	title,
	cards,
	filterIds
}) => (
	<div className='root codingCardsDirectory'>
		<style jsx>{`
			.root {
				width : 600px;
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
	</div>
)

CodingCardsDirectory.defaultProps = {
	title     : '',
	cards     : [],
	filterIds : []
}

CodingCardsDirectory.propTypes = {
	type : PropTypes.oneOf([
		'flow',
		'block'
	]),
	title : PropTypes.string,
	cards : PropTypes.arrayOf(PropTypes.shape({
		id        : PropTypes.string,
		filterIds : PropTypes.arrayOf(PropTypes.string),
	})),
	filterIds : PropTypes.arrayOf(PropTypes.string),
}

export default CodingCardsDirectory

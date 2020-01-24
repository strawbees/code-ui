import PropTypes from 'prop-types'
import tinycolor from 'tinycolor2'
import CodingCardsFilterContainer from 'src/containers/codingCardsFilterContainer'
import CodingCardPreviewContainer from 'src/containers/codingCardPreviewContainer'
import SvgIcon from 'src/components/svgIcon'
import editorIcons from 'src/assets/icons/editors/small'
import {
	GRAY
} from 'src/constants/colors'

const CodingCardsBrowserList = ({
	type,
	title,
	cardIds,
	setCurrentCardId,
}) => (
	<div className='root codingCardsBrowserList'>
		<style jsx>{`
			.root {
				width: 50rem;
				max-width: 100%;
				height: 26rem;
				max-height: 100%;
				display: flex;
				flex-direction: column;
				align-items: stretch;
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
			.root :global(.codingCardsFilter) {
				margin-top: 1rem;
				margin-bottom: 1rem;
			}
			.cards {
				outline: none;
				padding: 1rem;
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				justify-content: center;
				align-items: flex-start;
				background-color: ${tinycolor(GRAY).lighten(35).toRgbString()};
				overflow-y: scroll;
				flex: 1;
				border-radius: 1rem;
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
		<div className='cards' tabIndex='-1' disabled>
			{cardIds && cardIds.length > 0 && cardIds.map(id =>
				<CodingCardPreviewContainer
					type={type}
					key={id}
					id={id}
					onClick={() => setCurrentCardId(id)}
				/>
			)}
		</div>
	</div>
)

CodingCardsBrowserList.defaultProps = {
	title         : '',
	cardIds       : [],
	currentCardId : null,
}

CodingCardsBrowserList.propTypes = {
	type : PropTypes.oneOf([
		'flow',
		'block'
	]),
	title            : PropTypes.string,
	cardIds          : PropTypes.arrayOf(PropTypes.string),
	setCurrentCardId : PropTypes.func,
}

export default CodingCardsBrowserList

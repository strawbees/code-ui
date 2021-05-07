import PropTypes from 'prop-types'
import tinycolor from 'tinycolor2'
import Link from 'src/components/link'
import SvgIcon from 'src/components/svgIcon'
import IconButton from 'src/components/iconButton'
import ImageSlider from 'src/components/imageSlider'
import editorIcons from 'src/assets/icons/editors/small'
import arrowBackIcon from 'src/assets/icons/general/arrowBack.svg'

import {
	GRAY,
	WHITE,
	GREEN,
} from 'src/constants/colors'

const CodingCardsBrowserCard = ({
	type,
	title,
	programUrl,
	slides,
	setCurrentCardId,
	onOpenCode,
}) => (
	<div className='root codingCardsBrowserCard'>
		<style jsx>{`
			.root {
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
			.card {
				margin: 1rem 0 1rem 0;
				position: relative;
				padding-bottom:  1rem;
				background-color: ${tinycolor(GRAY).lighten(35).toRgbString()};
				border-radius: 1rem;
				width: 42rem;
				max-width: 100%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: stretch;
			}
			.card :global(.slides) {
				width: 100%;
			}
			.buttons {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
			}
			.buttons :global(.back) {

			}
			.buttons :global(.open-code) {
				outline: none;
				text-decoration: none;

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
		<div className='card'>
			<ImageSlider className='slides'
				items={slides}
			/>
		</div>
		<div className='buttons'>
			<IconButton className='back'
				icon={arrowBackIcon}
				onClick={() => setCurrentCardId(null)}
				labelKey='coding_cards.back-to-coding-cards'
			/>
			{programUrl &&
				<Link to={programUrl}
					onClick={onOpenCode}
					className='open-code'>
					<IconButton
						labelKey='coding_cards.open-program'
						textColor={WHITE}
						textHoverColor={WHITE}
						bgColor={GREEN}
						bgHoverColor={GREEN}
						tabIndex='-1'
					/>
				</Link>
			}
		</div>
	</div>
)

CodingCardsBrowserCard.defaultProps = {
	title            : '',
	programUrl       : '',
	slides           : [],
	setCurrentCardId : () => {},
	onOpenCode       : () => {},
}

CodingCardsBrowserCard.propTypes = {
	type : PropTypes.oneOf([
		'flow',
		'block',
	]),
	title      : PropTypes.string,
	programUrl : PropTypes.string,
	slides     : PropTypes.arrayOf(PropTypes.shape({
		title : PropTypes.string,
		url   : PropTypes.string,
	})),
	setCurrentCardId : PropTypes.func,
	onOpenCode       : PropTypes.func,
}

export default CodingCardsBrowserCard

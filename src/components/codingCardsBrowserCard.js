import PropTypes from 'prop-types'
import tinycolor from 'tinycolor2'
import Link from 'src/components/link'
import SvgIcon from 'src/components/svgIcon'
import IconButton from 'src/components/iconButton'
import hardwareIcons from 'src/assets/icons/codingCards/hardware'
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
	hardwareIds,
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
				margin-top: 1rem;
				position: relative;
				padding:  3rem;
				background-color: ${tinycolor(GRAY).lighten(25).toRgbString()};
				border-radius: 1rem;
				width: 42rem;
				max-width: 100%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: stretch;
			}
			.card :global(.back) {
				position: absolute;
				top: 1rem;
				left: 1rem;
			}
			.card .slides :global(.slide) {
				width: 100%;
				height: auto;
			}
			.card .hardware {
				position: absolute;
				bottom: 1rem;
				left: 1rem;
				display: flex;
				flex-direction: column;
			}
			.root .hardware :global( .icon) {
				width: 3rem;
				height: 3rem;
				margin-top: 0.125rem;
				margin-bottom: 0.125rem;
			}
			.root :global(.open-code) {
				text-decoration: none;
				position: absolute;
				bottom: 1rem;
				right: 1rem;
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
			<IconButton
				icon={arrowBackIcon}
				onClick={() => setCurrentCardId(null)}
				className='back'
				labelKey='coding_cards.back-to-coding-cards'
			/>
			<div className='slides'>
				{slides && slides.length > 0 &&
					<img
						alt={slides[0].title}
						src={slides[0].url}
						className='slide'
					/>
				}
			</div>
			<div className='hardware'>
				{hardwareIds && hardwareIds.length > 0 &&
					hardwareIds.map(id =>
						<SvgIcon
							icon={hardwareIcons[id]}
							key={id}
							className='icon'
						/>
					)
				}
			</div>
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
	hardwareIds      : [],
	setCurrentCardId : () => {},
	onOpenCode       : () => {},
}

CodingCardsBrowserCard.propTypes = {
	type : PropTypes.oneOf([
		'flow',
		'block'
	]),
	title      : PropTypes.string,
	programUrl : PropTypes.string,
	slides     : PropTypes.arrayOf(PropTypes.shape({
		title : PropTypes.string,
		url   : PropTypes.string,
	})),
	hardwareIds      : PropTypes.arrayOf(PropTypes.string),
	setCurrentCardId : PropTypes.func,
	onOpenCode       : PropTypes.func,
}

export default CodingCardsBrowserCard

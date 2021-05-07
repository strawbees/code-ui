import PropTypes from 'prop-types'
import Markdown from 'src/components/markdown'
import IconButton from 'src/components/iconButton'
import closeIcon from 'src/assets/icons/general/close.svg'
import { fireGlobalEvent } from 'src/utils/globalEvents'
import {
	BLACK,
	YELLOW,
} from 'src/constants/colors'

const Banner = ({
	id,
	title,
	content,
	backgroundColor,
	textColor,
	onHide,
}) =>
	<div className='root banner'>
		<style jsx>{`
			.root {
				background-color: ${backgroundColor};
				color: ${textColor};
				font-size: 1rem;
				text-align: center;
				display: flex;
				flex-direction: row;
				align-items: center;
			}
			.containter {
				padding: 0.5rem;
				display: flex;
				flex: 1;
				flex-direction: column;
				align-items: center;
			}
			.title  {
				font-weight: bold;
				text-transform: uppercase;
			}
			.root :global(.iconButton) {
				transform: scale(0.7);

			}
			@media (max-width: 650px) {
				.root {
					font-size: 0.8rem;
				}
			}
		`}</style>
		<div className='containter'
			onClick={() => {
				fireGlobalEvent('track-event', {
					category : 'ui',
					action   : 'banner click',
					label    : id,
				})
			}}>
			{title &&
				<div className='title'>
					{title}
				</div>
			}
			{content &&
				<div className='content'>
					<Markdown source={content}/>
				</div>
			}
		</div>
		<IconButton
			className='close'
			icon={closeIcon}
			onClick={() => {
				onHide(id)
				fireGlobalEvent('track-event', {
					category : 'ui',
					action   : 'hide banner',
					label    : id,
				})
			}}
		/>

	</div>

Banner.defaultProps = {
	backgroundColor : YELLOW,
	textColor       : BLACK,
}

Banner.propTypes = {
	id              : PropTypes.string,
	title           : PropTypes.string,
	content         : PropTypes.string,
	backgroundColor : PropTypes.string,
	textColor       : PropTypes.string,
	onHide          : PropTypes.func,
}

export default Banner

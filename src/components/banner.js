import PropTypes from 'prop-types'
import Markdown from 'react-remarkable'
import IconButton from 'src/components/iconButton'
import closeIcon from 'src/assets/icons/general/close.svg'
import {
	BLACK,
	YELLOW,
	WHITE
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
				padding: 1rem 2.5rem;
				background-color: ${backgroundColor};
				color: ${textColor};
				font-size: 1rem;
				text-align: center;
			}
			.containter {
				display: flex;
				flex-direction: column;
				align-items: center;
			}
			.title  {
				font-weight: bold;
				text-transform: uppercase;
			}
			.content :global(p:first-of-type) {
				margin-top: 0;
			}
			.content :global(p:last-of-type) {
				margin-bottom: 0;
				max-width: 50rem;
			}
			.root :global(.iconButton) {
				position: absolute;
				top: 0.5rem;
				right: 0.5rem;

			}
		`}</style>
		<div className='containter'>
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
			onClick={() => onHide(id)}
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

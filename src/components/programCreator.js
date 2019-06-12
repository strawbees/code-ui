import PropTypes from 'prop-types'
import tinycolor from 'tinycolor2'
import Link from 'src/components/link'
import SvgIcon from 'src/components/svgIcon'
import IconButton from 'src/components/iconButton'
import S from 'src/containers/sManager'
import createIcons from 'src/assets/icons/editors/create'
import fileIcons from 'src/assets/icons/file'
import { fireGlobalEvent } from 'src/utils/globalEvents'
import {
	WHITE,
	BLACK,
	YELLOW
} from 'src/constants/colors'

const ProgramCreator = ({
	flowUrl,
	blockUrl,
	textUrl,
	onUploadFactoryCodePress,
}) =>
	<div className='root programCreator'>
		<style jsx>{`
			.root {
				display: flex;
				flex-direction: column;
				align-items: center;
				color: ${WHITE};
				padding: 0.5rem;
			}
			.title {
				text-align: center;
			}
			.types {
				display: flex;
				flex-direction: row;
				margin-bottom: 1rem;
				flex-shrink: 0;
			}
			.types :global(> .link){
				text-decoration: none;
				display: flex;
				flex-direction: column;
				align-items: center;
				margin: 0 0.5rem;
				padding: 0.25rem 0 ;
				border-radius: 0.5rem;
				text-transform: uppercase;
				font-weight: bold;
			}
			.types :global(> .link:hover),
			.types :global(> .link:focus){
				background-color: ${tinycolor(YELLOW).toRgbString()};
				color: ${tinycolor(BLACK).toRgbString()};
				outline: none;
			}
			.types :global(.link .svgIcon){
				width: 7rem;
				height: 7rem;
			}
			@media (max-width: 400px) {
				.types :global(.link .svgIcon){
					width: 5rem;
					height: 5rem;
				}
			}
			/*@media (min-width: 1080px) {
				.types {
					flex-direction: column;
				}
			}*/
		`}</style>
		<div className='title global-type global-type-h2'>
			<S value='ui.program_creator.title'/>
		</div>
		<div className='types'>
			<Link to={flowUrl}
				onClick={() => fireGlobalEvent('track-event', {
					category : 'ui',
					action   : 'new flow program',
					label    : 'program creator'
				})}>
				<SvgIcon icon={createIcons.flow} />
				<S value='flow.base.title'/>
			</Link>
			<Link to={blockUrl}
				onClick={() => fireGlobalEvent('track-event', {
					category : 'ui',
					action   : 'new block program',
					label    : 'program creator'
				})}>
				<SvgIcon icon={createIcons.block} />
				<S value='block.base.title'/>
			</Link>
			<Link to={textUrl}
				onClick={() => fireGlobalEvent('track-event', {
					category : 'ui',
					action   : 'new text program',
					label    : 'program creator'
				})}>
				<SvgIcon icon={createIcons.text} />
				<S value='text.base.title'/>
			</Link>
		</div>
		<IconButton
			icon={fileIcons.upload}
			labelKey='ui.file_menu.options.upload-factory'
			onClick={() => {
				onUploadFactoryCodePress()
				fireGlobalEvent('track-event', {
					category : 'ui',
					action   : 'upload factory program',
					label    : 'program creator'
				})
			}}
		/>
	</div>

ProgramCreator.propTypes = {
	flowUrl                  : PropTypes.string,
	blockUrl                 : PropTypes.string,
	textUrl                  : PropTypes.string,
	onUploadFactoryCodePress : PropTypes.func,
}

export default ProgramCreator

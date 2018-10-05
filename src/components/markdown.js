import PropTypes from 'prop-types'
import tinycolor from 'tinycolor2'
import Remarkable from 'react-remarkable'
import {
	BLACK,
	YELLOW,
	WHITE,
	PINK,
	GRAY,
} from 'src/constants/colors'

const Markdown = ({
	source,
}) =>
	<div className='root markdown'>
		<style jsx>{`

			.root :global(> div > span hr) {
				border: none;
				border-top: solid 2px rgba(0,0,0,0.05);
			}
			/* Table */
			/*.root :global(> div > span img) {
				max-width: 100%;
			}
			.root :global(> div > span img:only-of-type) {
				display: block;
				margin: 0 auto;
			}
			.root :global(> div > span hr) {
				border: none;
				border-top: solid 2px rgba(0,0,0,0.05);
			}*/
			.root :global(> div > span table) {
				border-collapse: separate;
				box-sizing: border-box;
				border-spacing: 0;
				width:100%;
				margin:0px;
				padding:0px;
				table-layout: fixed;
				border-radius: 0.5rem 0.5rem 0 0;
				overflow: hidden;
				border: solid 1px ${tinycolor(GRAY).lighten(25)};
				margin-bottom: 1rem;
			}
			.root :global(> div > span thead tr) {
				background: ${tinycolor(PINK).lighten(25)};
			}
			.root :global(> div > span thead tr th) {
				text-align: left;
			}
			.root :global(> div > span th),
			.root :global(> div > span td) {
				padding: 1em;
			}
			.root :global(> div > span tbody) {
				font-size: 0.9rem;
			}
			.root :global(> div > span tbody tr:nth-child(even)){
				background: ${tinycolor(GRAY).lighten(30)};
			}
			/* End Table */
		`}</style>
		<Remarkable source={source} options={{
			html : true
		}}/>
	</div>

Markdown.propTypes = {
	source : PropTypes.string,
}

export default Markdown

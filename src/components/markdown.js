import PropTypes from 'prop-types'
import tinycolor from 'tinycolor2'
import ReactMarkdown from 'react-markdown'
import {
	PINK,
	GRAY,
} from 'src/constants/colors'

const Markdown = ({
	source,
}) =>
	<div className='root markdown'>
		<style jsx>{`
			/* Remove marging */
			.root :global(> *:first-child){
				margin-top: 0;
			}
			.root :global(> *:last-child){
				margin-bottom: 0;
			}
			.root :global(hr) {
				border: none;
				border-top: solid 2px rgba(0,0,0,0.05);
			}
			/* Table */
			/*.root :global(img) {
				max-width: 100%;
			}
			.root :global(img:only-of-type) {
				display: block;
				margin: 0 auto;
			}
			.root :global(hr) {
				border: none;
				border-top: solid 2px rgba(0,0,0,0.05);
			}*/
			.root :global(table) {
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
			.root :global(thead tr) {
				background: ${tinycolor(PINK).lighten(25)};
			}
			.root :global(thead tr th) {
				text-align: left;
			}
			.root :global(th),
			.root :global(td) {
				padding: 1em;
			}
			.root :global(tbody) {
				font-size: 0.9rem;
			}
			.root :global(tbody tr:nth-child(even)){
				background: ${tinycolor(GRAY).lighten(30)};
			}
			/* End Table */
		`}</style>
		<ReactMarkdown source={source} escapeHtml={false}/>
	</div>

Markdown.propTypes = {
	source : PropTypes.string,
}

export default Markdown

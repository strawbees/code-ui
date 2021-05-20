import React from 'react'
import PropTypes from 'prop-types'
import tinycolor from 'tinycolor2'
import S from 'src/containers/sManager'
import {
	GRAY,
	WHITE,
} from 'src/constants/colors'

const PageMD = ({
	queryRef,
	queryId,
}) =>
	<div className='root pageMD'>
		<style jsx>{`
			.root {
				justify-content: center;
				background-color: ${tinycolor(GRAY).lighten(25).toRgbString()};
				padding: 1rem;
				flex: 1;
			}
			.root :global(.markdown) {
				display: block;
				box-sizing: border-box;
				width: 100%;
				max-width: 50rem;
				margin: 0 auto;
				background-color: ${WHITE};
				padding: 1rem;
				border-radius: 1rem;
			}
			.root :global(.markdown > div > span > *) {
				margin-top: 0;
			}
			@media (max-width: 650px) {
				.root {
					padding: 0;
				}
				.root :global(.markdown) {
					border-radius: 0;
				}
			}
		`}</style>
		<S value={`${queryRef}${queryId ? `.${queryId}` : ''}.content`} markdown={true}/>
	</div>

PageMD.defaultProps = {}

PageMD.propTypes = {
	queryRef : PropTypes.string,
	queryId  : PropTypes.string,
}

export default PageMD

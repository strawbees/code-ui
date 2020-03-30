import PropTypes from 'prop-types'

import { BLACK } from 'src/constants/colors'

const GlobalStyles = ({
	rootPath
}) =>
	<>
	<style jsx>{`
		/* This stylesheet generated by Transfonter (https://transfonter.org) */
		@font-face {
			font-family: 'Text';
			font-display: swap;
			src: url('${rootPath}/static/fonts/BrandonText-Medium.woff2') format('woff2'),
				url('${rootPath}/static/fonts/BrandonText-Medium.woff') format('woff');
			font-weight: 500;
			font-style: normal;
		}
		@font-face {
			font-family: 'Text';
			font-display: swap;
			src: url('${rootPath}/static/fonts/BrandonText-Regular.woff2') format('woff2'),
				url('${rootPath}/static/fonts/BrandonText-Regular.woff') format('woff');
			font-weight: normal;
			font-style: normal;
		}
		@font-face {
			font-family: 'Text';
			font-display: swap;
			src: url('${rootPath}/static/fonts/BrandonText-Bold.woff2') format('woff2'),
				url('${rootPath}/static/fonts/BrandonText-Bold.woff') format('woff');
			font-weight: bold;
			font-style: normal;
		}
		@font-face {
			font-family: 'Code';
			font-display: swap;
			font-style: normal;
			font-weight: 400;
			src: local('Source Code Pro'),
				local('SourceCodePro-Regular'),
				url('${rootPath}/static/fonts/HI_SiYsKILxRpg3hIP6sJ7fM7PqlM-vWnsUnxlC9.woff2') format('woff2')
				url('${rootPath}/static/fonts/HI_SiYsKILxRpg3hIP6sJ7fM7PqlM-vWnsUnxlC9.woff') format('woff');
			unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
		}
		@font-face {
			font-family: 'Code';
			font-display: swap;
			font-style: normal;
			font-weight: 400;
			src: local('Source Code Pro'),
				local('SourceCodePro-Regular'),
				url('${rootPath}/static/fonts/HI_SiYsKILxRpg3hIP6sJ7fM7PqlPevWnsUnxg.woff2') format('woff2'),
				url('${rootPath}/static/fonts/HI_SiYsKILxRpg3hIP6sJ7fM7PqlPevWnsUnxg.woff') format('woff');
			unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
		}
		:global(html),
		:global(html > body) {
			margin: 0;
			font-family: 'Text', Arial, Helvetica, "Microsoft YaHei New", "Microsoft Yahei", "微软雅黑", 宋体, SimSun, STXihei, "华文细黑", sans-serif;
			font-size: 16px;
			line-height: 1.5;
			overscroll-behavior: none;
			touch-action: none;
			-webkit-font-smoothing: antialiased;
			-moz-osx-font-smoothing: grayscale;
			font-smoothing: antialiased;
			font-weight: 400;
			color: ${BLACK};
		}
		:global(html > body *){
			box-sizing: border-box;
		}
		:global(html > body a) {
			color: inherit;
		}
		:global(html),
		:global(html > body),
			position: fixed;
			height: 100%;
			width: 100vw;
			overflow: hidden;
		}
		:global(button) {
			border: none;
			margin: 0;
			padding: 0;
			width: auto;
			overflow: visible;
			background: transparent;
			color: inherit;
			font: inherit;
			text-align: inherit;
			line-height: normal;
			-webkit-font-smoothing: inherit;
			-moz-osx-font-smoothing: inherit;
			-webkit-appearance: none;
			cursor: pointer;
		}
		:global(button::-moz-focus-inner) {
			border: 0;
			padding: 0;
		}
		/* Typography */
		:global(.global-type) {
			vertical-align: baseline;
			font-family: inherit;
			font-weight: inherit;
			font-style: inherit;
			font-size: 100%;
			outline: 0;
			padding: 0;
			margin: 0;
			border: 0;
		}
		:global(.global-type p:first-child) {
			margin-top: 0;
		}
		:global(.global-type p:last-child) {
			margin-bottom: 0;
		}
		:global(.global-type-h1),
		:global(.global-type-h2),
		:global(.global-type-h3),
		:global(.global-type-h4) {
			font-weight: bold;
			text-transform: uppercase;
			line-height: 1.25;
			margin-top: 0;
			margin-bottom: 1rem;
		}
		:global(.global-type-h1) {
			font-size: 2.5rem;
		}
		:global(.global-type-h2) {
			font-size: 2.0rem;
		}
		:global(.global-type-h3) {
			text-transform: none;
			font-size: 1.5rem;
		}
		:global(.global-type-h4) {
			text-transform: none;
			font-size: 1rem;
		}
		@media (max-width: 400px) {
			:global(.global-type-h1) {
				font-size: 2rem;
			}
			:global(.global-type-h2) {
				font-size: 1.5rem;
			}
		}
	`}</style>
	</>


GlobalStyles.propTypes = {
	rootPath : PropTypes.string
}

export default GlobalStyles

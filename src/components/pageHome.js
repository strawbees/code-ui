import React from 'react'
import tinycolor from 'tinycolor2'
import UserArea from 'src/components/userArea'
import StorageProgramListContainer from 'src/containers/storageProgramListContainer'
import ProgramCreatorContainer from 'src/containers/programCreatorContainer'
import {
	GRAY
} from 'src/constants/colors'

const PageHome = () =>
	<div className='root pageHome'>
		<style jsx>{`
			.root {
				min-height: 100%;
				display: flex;
				flex-direction: column;
				align-items: stretch;
			}
			.section {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				padding: 3rem 0;
			}
			.section :global(> *) {
				width: 100%;
				max-width: 40rem;
			}
			.section.top {
				background-color: ${tinycolor(GRAY).darken(25).toRgbString()};
			}
			.section.bottom {
				flex: 1;
				background-color: ${tinycolor(GRAY).lighten(25).toRgbString()};
			}
			.section :global(.userArea) {
				margin-bottom: 1rem;
			}
			@media (max-width: 400px) {
				.section {
					padding: 1rem 0;
				}
			}
			@media (max-height: 550px) {
				.section {
					padding: 1rem 0;
				}
			}
			@media (min-width: 1080px) {
				.root {
					flex-direction: row;
					height: 100%;
				}
				.section {
					height: 100%;
				}
				.section.top {
					overflow-y: scroll;
					flex: 1;
					-webkit-overflow-scrolling: touch;
				}
				.section.bottom {
					overflow-y: scroll;
					flex: 1;
					-webkit-overflow-scrolling: touch;
				}
			}
		`}</style>
		<div className='section top'>
			<ProgramCreatorContainer/>
		</div>
		<div className='section bottom'>
			<UserArea/>
			<StorageProgramListContainer/>
		</div>
	</div>

PageHome.defaultProps = {}

PageHome.propTypes = {}


export default PageHome

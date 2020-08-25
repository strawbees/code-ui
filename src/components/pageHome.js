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
				position: relative;
				flex: 1;
				display: flex;
				flex-direction: column;
				align-items: stretch;
				justify-content: center;
				min-height: min-content;
			}
			.banner {
				position: absolute;
			}
			.section {
				position: relative;
				display: flex;
				flex-direction: column;
				align-items: stretch;
				justify-content: center;
				flex: 1;
				min-height: min-content;
			}
			.section .container {
				position: relative;
				flex: 1;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				padding: 3rem 0;
				min-height: min-content;
			}
			.section.top {
				background-color: ${tinycolor(GRAY).darken(25).toRgbString()};
			}
			.section.top :global(.programCreator){
				max-width: 100%;
			}
			.section.bottom {
				background-color: ${tinycolor(GRAY).lighten(25).toRgbString()};
			}
			.section.bottom :global(.programList){
				width: 100%;
				max-width: 40rem;
			}
			.section.bottom :global(.userArea) {
				margin-bottom: 1rem;
			}
			@media (max-height: 650px) {
				.section .container {
					padding: 1rem 0;
				}
			}
			@media (min-width: 1080px) {
				.root {
					flex-direction: row;
					min-height: 0;
				}
				.section {
					min-height: 0;
					display: block;
					overflow-y: auto;
				}
				.section .container {
					min-height: 100%;
				}
			}
		`}</style>
		<div className='section top'>
			<div className='container'>
				<ProgramCreatorContainer/>
			</div>
		</div>
		<div className='section bottom'>
			<div className='container'>
				<UserArea/>
				<StorageProgramListContainer/>
			</div>
		</div>
	</div>

PageHome.defaultProps = {}

PageHome.propTypes = {}

export default PageHome

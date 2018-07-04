import React from 'react'
import tinycolor from 'tinycolor2'
import StorageProgramListContainer from 'src/containers/storageProgramListContainer'
import ProgramCreatorContainer from 'src/containers/programCreatorContainer'
import {
	GRAY
} from 'src/constants/colors'

const PageHome = () =>
	<div className='root pageHome'>
		<style jsx>{`
			.root {
				min-height: 100%;;
				display: flex;
				flex-direction: column;
				align-items: stretch;
			}
			.section {
				display: flex;
				flex-direction: column;
				align-items: center;
				padding: 3rem 0;
			}
			.section :global(> *) {
				width: 100%;
				max-width: 40rem;
			}
			.section.top {
				background-color: ${tinycolor(GRAY).darken(15).toRgbString()};
			}
			.section.bottom {
				flex: 1;
				background-color: ${tinycolor(GRAY).lighten(25).toRgbString()};
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
		`}</style>
		<div className='section top'>
			<ProgramCreatorContainer/>
		</div>
		<div className='section bottom'>
			<StorageProgramListContainer/>
		</div>
	</div>

PageHome.defaultProps = {}

PageHome.propTypes = {}


export default PageHome

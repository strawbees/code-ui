import React from 'react'
import PropTypes from 'prop-types'
import Spinner from 'src/components/spinner'
import GlobalStylesContainer from 'src/containers/globalStylesContainer'
import HeadContainer from 'src/containers/headContainer'
import HeaderContainer from 'src/containers/headerContainer'
import FooterContainer from 'src/containers/footerContainer'
import PageContainer from 'src/containers/pageContainer'
import PageError from 'src/components/pageError'
import ModalContainer from 'src/containers/modalContainer'
import SerialInterfaceManager from 'src/containers/serialInterfaceManager'
import NavigationManager from 'src/containers/navigationManager'
import StorageManager from 'src/containers/storageManager'
import TrackingManager from 'src/containers/trackingManager'

const App = ({
	displayPageLoader,
	displayError,
}) =>
	<div className="root app">
		<style jsx>{`
			.root {
				position: fixed;
				height: 100%;
				width: 100vw;
				overflow: hidden;
			}
			.root {
				display: flex;
				flex-direction: column;
			}
			.root :global(> .header) {
				position: relative;
				z-index: 2;
				height: 3rem;
			}
			.root :global(> .page) {
				position: relative;
				z-index: 1;
				height: calc(100% - 5rem);
				overflow-y: auto;
			}
			.root :global(> .footer) {
				position: relative;
				z-index: 2;
				height: 2rem;
			}
			/* Page loader */
			.page-loader {
				position: fixed;
				width: 100%;
				height: 100%;
				background-color: rgba(255,255,255,0.6);
				z-index: 999;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
			}
		`}</style>
		<GlobalStylesContainer />
		<StorageManager />
		<NavigationManager />
		<SerialInterfaceManager />
		<TrackingManager />
		<HeadContainer />
		<HeaderContainer />
		{displayError ?
			<PageError statusCode={displayError} />
			:
			<PageContainer />
		}
		<FooterContainer />
		<ModalContainer />
		{displayPageLoader &&
			<div className='page-loader'>
				<Spinner scale={4}/>
			</div>
		}
	</div>

App.propTypes = {
	displayPageLoader : PropTypes.bool,
	displayError      : PropTypes.PropTypes.oneOf([false, 404, 500]),
}

export default App

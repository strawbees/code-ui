import React from 'react'
import StorageProgramListContainer from 'src/containers/storageProgramListContainer'
import ProgramCreatorContainer from 'src/containers/programCreatorContainer'

class PageHome extends React.Component {
	render() {
		return (
			<div className='root pageHome'>
				<ProgramCreatorContainer/>
				<StorageProgramListContainer />
			</div>
		)
	}
}

PageHome.defaultProps = {}

PageHome.propTypes = {}


export default PageHome

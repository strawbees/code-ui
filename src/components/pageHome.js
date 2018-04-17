import React from 'react'
import UserProgramListContainer from 'src/containers/userProgramListContainer'

class PageHome extends React.Component {
	constructor(props) {
		super(props)
		this.localStorageWidget = React.createRef()
	}
	componentDidMount() {
		const el = document.getElementById('remotestorage-widget-container')
		el.style.display = 'block'
		this.localStorageWidget.current.appendChild(el)
	}
	componentWillUnmount() {
		const el = document.getElementById('remotestorage-widget-container')
		el.style.display = 'none'
		document.body.appendChild(el)
	}
	render() {
		return (
			<div className='root pageHome'>
				<div ref={this.localStorageWidget} />
				<UserProgramListContainer />
			</div>
		)
	}
}

PageHome.defaultProps = {}

PageHome.propTypes = {}


export default PageHome

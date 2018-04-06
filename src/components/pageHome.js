import React from 'react'
import UserProgramListContainer from 'src/containers/userProgramListContainer'

//import PropTypes from 'prop-types'

class PageHome extends React.Component {
	constructor(props) {
		super(props)
		this.localStorageWidget = React.createRef()
	}
	componentDidMount() {
		const el = document.getElementById('remotestorage-widget-container')
		el.style.display = 'inital'
		this.localStorageWidget.current.appendChild(el)
	}
	componentWillUnmount() {
		const el = document.getElementById('remotestorage-widget-container')
		el.style.display = 'none'
		document.body.appendChild(el)
	}
	render() {
		const {
			addProgram
		} = this.props
		return (
			<div className='root pageHome'>
				<style jsx>{`
					:global(#remotestorage-widget-container) {
						display: initial !important;
					}
				`}</style>
				<div ref={this.localStorageWidget} />
				<UserProgramListContainer />
				<button onClick={() => addProgram({
					type : 'flow',
					name : 'Untitled Program',
					data : Date.now()
				})}>
					add program
				</button>
			</div>
		)
	}
}

PageHome.defaultProps = {}

PageHome.propTypes = {}


export default PageHome

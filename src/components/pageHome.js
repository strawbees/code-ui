import React from 'react'
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
		return (
			<div className='root pageHome'>
				<style jsx>{`
					:global(#remotestorage-widget-container) {
						display: initial !important;
					}
				`}</style>
				<div ref={this.localStorageWidget} />
			</div>
		)
	}
}

PageHome.defaultProps = {}

PageHome.propTypes = {}


export default PageHome

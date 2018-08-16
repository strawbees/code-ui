import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import PageError from 'src/components/pageError'
import PageHomeContainer from 'src/containers/pageHomeContainer'
import PageFlowContainer from 'src/containers/pageFlowContainer'
import PageBlockContainer from 'src/containers/pageBlockContainer'
import PageTextContainer from 'src/containers/pageTextContainer'
import PageUserContainer from 'src/containers/pageUserContainer'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'


const PageContainer = (props) => {
	const components = {
		home  : PageHomeContainer,
		flow  : PageFlowContainer,
		block : PageBlockContainer,
		text  : PageTextContainer,
		user  : PageUserContainer,
	}
	const RefComponent = components[props.queryRef] || PageError
	return (
		<div className='root page'>
			<style jsx>{`
				.root {
					overflow-y: scroll;
					-webkit-overflow-scrolling: touch;
					overscroll-behavior: none;
				}
				.root :global(> *) {
					min-height: 100%;
				}
			`}</style>
			<RefComponent {...props}/>
		</div>
	)
}

PageContainer.propTypes = {
	queryRef : PropTypes.oneOf([
		'home',
		'flow',
		'block',
		'text',
		'error',
		'user'
	])
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(PageContainer)

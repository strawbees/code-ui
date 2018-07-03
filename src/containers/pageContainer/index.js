import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import dynamic from 'next/dynamic'
import Spinner from 'src/components/spinner'
import PageError from 'src/components/pageError'
import PageHomeContainer from 'src/containers/pageHomeContainer'
import PageFlowContainer from 'src/containers/pageFlowContainer'
import PageBlockContainer from 'src/containers/pageBlockContainer'
import PageTextContainer from 'src/containers/pageTextContainer'
// const PageHomeContainer = dynamic(
// 	import('src/containers/pageHomeContainer'),
// 	{ loading : () => <Spinner/> }
// )
// const PageFlowContainer = dynamic(
// 	import('src/containers/pageFlowContainer'),
// 	{ loading : () => <Spinner/> }
// )
// const PageBlockContainer = dynamic(
// 	import('src/containers/pageBlockContainer'),
// 	{ loading : () => <Spinner/> }
// )
// const PageTextContainer = dynamic(
// 	import('src/containers/pageTextContainer'),
// 	{ loading : () => <Spinner/> }
// )

import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'


const PageContainer = (props) => {
	const components = {
		home  : PageHomeContainer,
		flow  : PageFlowContainer,
		block : PageBlockContainer,
		text  : PageTextContainer,
	}
	const RefComponent = components[props.queryRef] || PageError
	return (
		<div className='root page'>
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
		'error'
	])
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(PageContainer)

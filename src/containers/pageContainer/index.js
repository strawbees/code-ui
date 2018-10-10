import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import GlobalBannerContainer from 'src/containers/globalBannerContainer'
import PageBlockContainer from 'src/containers/pageBlockContainer'
import PageEmailConfirmationContainer from 'src/containers/pageEmailConfirmationContainer'
import PageError from 'src/components/pageError'
import PageFlowContainer from 'src/containers/pageFlowContainer'
import PageHomeContainer from 'src/containers/pageHomeContainer'
import PageMDContainer from 'src/containers/pageMDContainer'
import PagePasswordResetContainer from 'src/containers/pagePasswordResetContainer'
import PageTextContainer from 'src/containers/pageTextContainer'
import PageUserContainer from 'src/containers/pageUserContainer'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'


const PageContainer = (props) => {
	const components = {
		block                : PageBlockContainer,
		'email-confirmation' : PageEmailConfirmationContainer,
		flow                 : PageFlowContainer,
		home                 : PageHomeContainer,
		md                   : PageMDContainer,
		'password-reset'     : PagePasswordResetContainer,
		text                 : PageTextContainer,
		user                 : PageUserContainer,
	}
	const RefComponent = components[props.queryRef] || PageError
	return (
		<>
			{props.queryRef === 'home' &&
				<GlobalBannerContainer />
			}
			<main role='main' className='root page'>
				<style jsx>{`
					.root {
						overflow-y: auto;
						-webkit-overflow-scrolling: touch;
						overscroll-behavior: none;
						display: flex;
						flex-direction: column;
						align-items: stretch;
					}
				`}</style>
				<RefComponent {...props}/>
			</main>
		</>
	)
}

PageContainer.propTypes = {
	queryRef : PropTypes.oneOf([
		'block',
		'email-confirmation',
		'error',
		'flow',
		'home',
		'md',
		'password-reset',
		'text',
		'user',
	])
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(PageContainer)

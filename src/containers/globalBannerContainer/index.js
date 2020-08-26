import React from 'react'
import { connect } from 'react-redux'
import Banner from 'src/components/banner'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

class GlobalBannerContainer extends React.Component {
	state = {
		mounted : false
	}

	componentDidMount() {
		this.setState({ mounted : true })
	}

	render() {
		const { mounted } = this.state
		const { banners, hideBanner } = this.props
		if (!mounted) {
			return null
		}
		return (
			<React.Fragment>
				{banners.map(bannerProps =>
					<Banner
						onHide={hideBanner}
						key={bannerProps.id}
						{...bannerProps}
					/>
				)}
			</React.Fragment>
		)
	}
}

const globalBannerContainerConnected = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(GlobalBannerContainer)

export default globalBannerContainerConnected

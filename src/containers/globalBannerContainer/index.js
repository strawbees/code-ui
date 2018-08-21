import React from 'react'
import { connect } from 'react-redux'
import Banner from 'src/components/banner'
import mapStateToProps from './mapStateToProps'
import mapDispatchToProps from './mapDispatchToProps'
import mergeProps from './mergeProps'

const GlobalBannerContainer = ({ banners, hideBanner }) =>
	<React.Fragment>
		{banners.map(bannerProps =>
			<Banner
				onHide={hideBanner}
				key={bannerProps.id}
				{...bannerProps}
			/>
		)}
	</React.Fragment>

export default connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(GlobalBannerContainer)

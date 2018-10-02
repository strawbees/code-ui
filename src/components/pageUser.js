import React from 'react'
import PropTypes from 'prop-types'
import tinycolor from 'tinycolor2'
import UserProfileAvatar from 'src/components/userProfileAvatar'
import StoragePublicProfileProgramListContainer from 'src/containers/storagePublicProfileProgramListContainer'
import {
	GRAY
} from 'src/constants/colors'

const PageUser = ({
	username
}) =>
	<div className='root pageUser'>
		<style jsx>{`
			.root {
				justify-content: center;
				background-color: ${tinycolor(GRAY).lighten(25).toRgbString()};
				padding: 1rem 0;
				flex: 1;
			}
			.root :global(.programList) {
				width: 100%;
				max-width: 40rem;
				margin: 0 auto;
			}
		`}</style>
		<UserProfileAvatar username={username} isAnon={false}/>
		<StoragePublicProfileProgramListContainer/>
	</div>

PageUser.defaultProps = {}

PageUser.propTypes = {
	username : PropTypes.string
}


export default PageUser

import PropTypes from 'prop-types'
import getYouTubeIdFromUrl from 'src/utils/getYouTubeIdFromUrl'

const VideoPlayer = ({
	url,
	autoplay,
	ratio,
	...otherProps
}) =>
	<div
		className='root videoPlayer'>
		<style jsx>{`
			.root {
				position: relative;
				max-width: 100%;
				width: 600px;
				padding-bottom: ${ratio * 100}%;
			}
			.root iframe{
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
			}
		`}</style>
		{url &&
			<iframe
				title='Video'
				src={`https://www.youtube.com/embed/${getYouTubeIdFromUrl(url)}?rel=0&showinfo=0${autoplay ? '&autoplay=1' : ''}`}
				frameBorder="0"
				allow="autoplay; encrypted-media"
				allowFullScreen
				{...otherProps}>
			</iframe>
		}
	</div>

VideoPlayer.defaultProps = {
	ratio : 9 / 16,
}

VideoPlayer.propTypes = {
	url      : PropTypes.string,
	autoplay : PropTypes.bool,
	ratio    : PropTypes.number,
}

export default VideoPlayer

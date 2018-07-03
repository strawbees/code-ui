import PropTypes from 'prop-types'
import tinycolor from 'tinycolor2'
import {
	WHITE,
} from 'src/constants/colors'

const PageError = ({
	statusCode,
}) => <div className='root pageError'>
	<style jsx>{`
		.root {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			background-color: ${tinycolor(WHITE).toRgbString()};
		}
	`}</style>
	<div>{statusCode}</div>
</div>


PageError.propTypes = {
	statusCode : PropTypes.number
}


export default PageError

import PropTypes from 'prop-types'
import Button from 'src/components/button'
import SvgIcon from 'src/components/svgIcon'
import S from 'src/containers/sManager'

const IconButtonContent = ({
	icon,
	textKey
}) =>
	<div className='root'>
		<style jsx>{`
			.root{
				display: flex;
				flex-direction: row;
				align-items: center;
				text-transform: capitalize;
			}
		`}</style>
		{icon &&
			<SvgIcon icon={icon}/>
		}
		{textKey &&
			<S value={textKey}/>
		}
	</div>

const IconButton = ({
	icon,
	textKey,
	disabled,
	onClick = () => {}
}) =>
	<Button
		disabled={disabled}
		onClick={onClick}>
		<IconButtonContent icon={icon} textKey={textKey}/>
	</Button>

IconButton.propTypes = {
	icon     : PropTypes.func,
	textKey  : PropTypes.string,
	disabled : PropTypes.bool,
	onClick  : PropTypes.func,
}

export default IconButton

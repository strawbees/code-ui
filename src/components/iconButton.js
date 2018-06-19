import PropTypes from 'prop-types'
import Button from 'src/components/button'
import SvgIcon from 'src/components/svgIcon'
import S from 'src/containers/sManager'

const IconButtonContent = ({
	icon,
	labelKey,
	hideLabelOnSmallScreen,
}) =>
	<div className={`root ${hideLabelOnSmallScreen ? 'hide-label' : ''} ${icon ? 'has-icon' : ''} ${labelKey ? 'has-label' : ''}`}>
		<style jsx>{`
			.root {
				display: flex;
				flex-direction: row;
				align-items: center;
				text-transform: capitalize;
			}
			.root :global(>.svgIcon) {
				width: 1.75rem;
				height: 1.75rem;
			}
			.root.has-label :global(>.svgIcon) {
				margin: -0.25rem 0.25rem -0.25rem -0.5rem;
			}
			.root:not(.has-label) :global(>.svgIcon) {
				margin: -0.1rem -0.85rem;
			}
			@media (max-width: 600px){
				.root.hide-label .label {
					display: none;
				}
				.root.hide-label.has-label :global(>.svgIcon) {
					margin: -0.1rem -0.85rem;
				}
			}
		`}</style>
		{icon &&
			<SvgIcon icon={icon}/>
		}
		{labelKey &&
			<span className='label'>
				<S value={labelKey}/>
			</span>
		}
	</div>

const IconButton = ({
	icon,
	labelKey,
	disabled,
	hideLabelOnSmallScreen,
	onClick = () => {},
	...otherProps
}) =>
	<Button
		disabled={disabled}
		onClick={onClick}
		{...otherProps}>
		<IconButtonContent
			icon={icon}
			labelKey={labelKey}
			hideLabelOnSmallScreen={hideLabelOnSmallScreen}
		/>
	</Button>

IconButton.propTypes = {
	icon     : PropTypes.func,
	labelKey : PropTypes.string,
	disabled : PropTypes.bool,
	onClick  : PropTypes.func,

	hideLabelOnSmallScreen : PropTypes.bool,
}

export default IconButton

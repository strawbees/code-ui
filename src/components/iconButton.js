import PropTypes from 'prop-types'
import Button from 'src/components/button'
import SvgIcon from 'src/components/svgIcon'
import S from 'src/containers/sManager'

const IconButtonContent = ({
	icon,
	labelKey,
	label,
	hideLabelOnMediaQuery,
}) =>
	<div className={`root ${hideLabelOnMediaQuery ? 'hide-label' : ''} ${icon ? 'has-icon' : ''} ${(labelKey || label) ? 'has-label' : ''}`}>
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
				margin: -0.1rem -0.85rem -0.1rem -0.84rem;
			}
			@media (${hideLabelOnMediaQuery}){
				.root.hide-label .label {
					display: none;
				}
				.root.hide-label.has-label :global(>.svgIcon) {
					margin: -0.1rem -0.85rem -0.1rem -0.84rem;
				}
			}
		`}</style>
		{icon &&
			<SvgIcon icon={icon}/>
		}
		{label &&
			<span className='label'>
				{label}
			</span>
		}
		{(labelKey && !label) &&
			<span className='label'>
				<S value={labelKey}/>
			</span>
		}
	</div>

const IconButton = ({
	icon,
	labelKey,
	disabled,
	hideLabelOnMediaQuery,
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
			hideLabelOnMediaQuery={hideLabelOnMediaQuery}
		/>
	</Button>

IconButton.propTypes = {
	icon     : PropTypes.func,
	label    : PropTypes.string,
	labelKey : PropTypes.string,
	disabled : PropTypes.bool,
	onClick  : PropTypes.func,

	hideLabelOnMediaQuery : PropTypes.string,
}

export default IconButton

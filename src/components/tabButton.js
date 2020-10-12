import PropTypes from 'prop-types'
import Button from 'src/components/button'
import SvgIcon from 'src/components/svgIcon'
import S from 'src/containers/sManager'

const TabButtonContent = ({
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
			}
			.root :global(>.svgIcon) {
				width: 1.75rem;
				height: 1.75rem;
			}
			.root.has-label :global(>.svgIcon) {
				margin: -0.25rem 0.25rem -0.25rem -0.5rem;
			}
			.root:not(.has-label) :global(>.svgIcon) {
				margin: -0.1rem -0.85rem -0.1rem -0.9rem;
			}
			@media (${hideLabelOnMediaQuery}){
				.root.hide-label .label {
					display: none;
				}
				.root.hide-label.has-label :global(>.svgIcon) {
					margin: -0.1rem -0.85rem -0.1rem -0.9rem;
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

const TabButton = ({
	icon,
	label,
	labelKey,
	disabled,
	hideLabelOnMediaQuery,
	onClick = () => {},
	className = '',
	...otherProps
}) =>
	<>
		<style jsx>{`
			:global(.tabButton) {
				border-radius: 0.5em 0.5em 0 0 !important;
				text-transform: uppercase;
				font-size: 0.8rem;
				letter-spacing: 0.1rem;
			}
		`}</style>
		<Button
			disabled={disabled}
			onClick={onClick}
			className={`${className} tabButton`}
			{...otherProps}>
			<TabButtonContent
				icon={icon}
				label={label}
				labelKey={labelKey}
				hideLabelOnMediaQuery={hideLabelOnMediaQuery}
			/>
		</Button>
	</>

TabButton.propTypes = {
	icon      : PropTypes.func,
	label     : PropTypes.string,
	labelKey  : PropTypes.string,
	disabled  : PropTypes.bool,
	onClick   : PropTypes.func,
	className : PropTypes.string,

	hideLabelOnMediaQuery : PropTypes.string,
}

export default TabButton

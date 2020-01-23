import PropTypes from 'prop-types'
import SvgIcon from 'src/components/svgIcon'
import Button from 'src/components/button'
import icons from 'src/assets/icons/codingCards/hardware'

const CodingCardPreview = ({
	title,
	hardwareIds,
	onClick,
}) =>
	<div className='root codingCardPreview'>
		<style jsx>{`
			.root :global(>.button) {
				padding: 0.25rem 0.5rem;
				border-radius: 0.5rem;
			}
			.root :global(>.button .container) {
				display: flex;
				flex-direction: column;
				width: 10rem;
				padding: 0.5rem 0;
			}
			.root :global(>.button .container .icons) {
				display: flex;
				flex-direction: row;
				justify-content: center;
			}
			.root :global(>.button .container .icons .icon) {
				width: 3rem;
				height: 3rem;
				margin-left: 0.125rem;
				margin-right: 0.125rem;
			}
			.root :global(>.button .container .title-container) {
				height: 2rem;
				display: flex;
				flex-direction: row;
				align-items: center;
				margin-top: 0.5rem;
				justify-content: center;
			}
			.root :global(>.button .container .title-container .title) {
				text-align: center;
				line-height: 1rem;
			}
		`}</style>
		<Button
			onClick={onClick}>
			<div className='container'>
				<div className='icons'>
					{hardwareIds && hardwareIds.length > 0 &&
						hardwareIds.map(id =>
							<SvgIcon
								icon={icons[id]}
								key={id}
								className='icon'
							/>
						)
					}
				</div>
				{title &&
					<div className='title-container'>
						<div className='title'>
							{title}
						</div>
					</div>
				}
			</div>
		</Button>
	</div>

CodingCardPreview.defaultProps = {
	hardwareIds : [],
	onClick     : () => {},
}

CodingCardPreview.propTypes = {
	title       : PropTypes.string,
	hardwareIds : PropTypes.arrayOf(PropTypes.string),
	onClick     : PropTypes.func,
}

export default CodingCardPreview

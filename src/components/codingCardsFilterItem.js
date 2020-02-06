import PropTypes from 'prop-types'
import Button from 'src/components/button'
import SvgIcon from 'src/components/svgIcon'
import hardwareIcons from 'src/assets/icons/codingCards/hardware'
import greenCheckIcon from 'src/assets/icons/general/greenCheck.svg'

const CodingCardsFilterItem = ({
	iconId,
	title,
	selected,
	onClick,
}) =>
	<div className='root codingCardsFilterItem'>
		<style jsx>{`
			.root :global(> .button) {
				width: 5rem;
				border-radius: 0.5rem;
			}
			.root :global(> .button .container) {
				display: flex;
				flex-direction: column;
				align-items: center;
			}
			.root :global(> .button .container .title) {
				font-size: 0.6rem;
				width: 5rem;
				text-align: center;
			}
			.root :global(> .button .container .icon-container) {
				position: relative;
			}
			.root :global(> .button .container .icon-container .check){
				position: absolute;
				top: -0.5rem;
				right:  -0.5rem;
				width: 1rem;
				height: 1rem;
			}
			.root :global(> .button .container .icon-container .icon) {
				width: 2.5rem;
				height: 2.5rem;
			}
		`}</style>
		<Button onClick={onClick}>
			<div className='container'>
				<div className='icon-container'>
					{iconId &&
						<SvgIcon
							icon={hardwareIcons[iconId]}
							className='icon'
						/>
					}
					{selected &&
						<SvgIcon
							icon={greenCheckIcon}
							className='check'
						/>
					}
				</div>

				{title &&
					<div className='title'>
						{title}
					</div>
				}
			</div>
		</Button>
	</div>

CodingCardsFilterItem.defaultProps = {
	onClick : () => {}
}

CodingCardsFilterItem.propTypes = {
	iconId   : PropTypes.string,
	title    : PropTypes.string,
	selected : PropTypes.bool,
	onClick  : PropTypes.func,
}

export default CodingCardsFilterItem

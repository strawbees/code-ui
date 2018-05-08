import PropTypes from 'prop-types'
import Toggle from 'src/components/toggle'
import CategoryMenuContainer from 'src/editors/flow/containers/categoryMenuContainer'
import tinycolor from 'tinycolor2'
import { GRAY } from 'src/constants/colors'

const SideMenu = ({
	setDisplayAdancedNodes,
	displayAdvancedNodes,
	categoryIds,
}) =>
	<div className='root sideMenu'>
		<style jsx>{`
			.root {
				display: grid;
				grid-template-columns: 1;
				grid-template-rows: 2rem auto;
				align-items: start;
				justify-items: center;
				background-color: ${tinycolor(GRAY).lighten(35).toRgbString()};
				padding-top: 0.5rem;
				box-sizing: border-box;
				border-right: solid 0.4rem ${tinycolor(GRAY).lighten(20).toRgbString()};;
			}
			.categoryMenus {
				justify-self: stretch;
			}
		`}</style>
		<Toggle
			on={displayAdvancedNodes}
			onChange={setDisplayAdancedNodes}
			offLabel='flow.menu.toggle.simple'
			onLabel='flow.menu.toggle.advanced'
		/>
		<div className='categoryMenus'>
			{categoryIds && categoryIds.map(id =>
				<CategoryMenuContainer key={id} id={id} />
			)}
		</div>
	</div>

SideMenu.propTypes = {
	setDisplayAdancedNodes : PropTypes.func,
	displayAdvancedNodes   : PropTypes.bool,
	categoryIds            : PropTypes.arrayOf(PropTypes.string),
}

export default SideMenu

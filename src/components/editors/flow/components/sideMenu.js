import PropTypes from 'prop-types'
import Toggle from 'src/components/toggle'
import tinycolor from 'tinycolor2'
import { GRAY } from 'src/constants/colors'

const SideMenu = ({
	flowEditorDisplayAdancedNodes,
	displayAdvancedNodes,
	categoryIds,
}) =>
	<div className='root sideMenu'>
		<style jsx>{`
			.root {
				display: flex;
				flex-direction: column;
				align-items: center;
				background-color: ${tinycolor(GRAY).lighten(35).toRgbString()};
				padding-top: 0.5rem;
				box-sizing: border-box;
				border-right: solid 0.4rem ${tinycolor(GRAY).lighten(20).toRgbString()};;
			}
		`}</style>
		<Toggle
			on={displayAdvancedNodes}
			onChange={flowEditorDisplayAdancedNodes}
			offLabel='flow.menu.toggle.simple'
			onLabel='flow.menu.toggle.advanced'
		/>
	</div>

SideMenu.propTypes = {
	flowEditorDisplayAdancedNodes : PropTypes.func,

	displayAdvancedNodes : PropTypes.bool,
	categoryIds          : PropTypes.arrayOf(PropTypes.string),
}

export default SideMenu

import React from 'react'
import DropdownMenu from 'src/components/dropdownMenu'

const HelpMenu = () =>
	<DropdownMenu
		labelKey='ui.help_menu.title'
		options={[
			{
				labelKey     : 'ui.help_menu.options.learning_platform',
				linkKey      : 'ui.help_menu.options.learning_platform.url',
				linkExternal : true,
			}
		]}
	/>

export default HelpMenu

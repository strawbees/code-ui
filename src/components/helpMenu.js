import React from 'react'
import PropTypes from 'prop-types'
import DropdownMenu from 'src/components/dropdownMenu'

const HelpMenu = ({
	modalViewCodingCards,
}) => {
	const options = [
		{
			disabled : true,
			labelKey : 'ui.help_menu.options.coding_cards.flow.title',
			onClick  : () => modalViewCodingCards('flow')
		},
		{
			labelKey : 'ui.help_menu.options.coding_cards.block.title',
			onClick  : () => modalViewCodingCards('block')
		},
		{
			divider      : true,
			labelKey     : 'ui.help_menu.options.learning_platform',
			linkKey      : 'ui.help_menu.options.learning_platform.url',
			linkExternal : true,
		}
	]
	return (
		<DropdownMenu
			labelKey='ui.help_menu.title'
			options={options}
		/>
	)
}

HelpMenu.propTypes = {
	modalViewCodingCards : PropTypes.func,
}

export default HelpMenu

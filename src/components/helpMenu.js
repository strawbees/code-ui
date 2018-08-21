import React from 'react'
import PropTypes from 'prop-types'
import DropdownMenu from 'src/components/dropdownMenu'

const HelpMenu = ({
	safeOpenVideoModal,
	videoIntroCODE,
	videoIntroFlow,
	videoIntroBlock,
	videoIntroText,
	videoTroubleshooting,
}) => {
	const options = [
		{
			disabled : true,
			labelKey : 'ui.help_menu.options.intro_code.title',
			onClick  : () => safeOpenVideoModal({
				url      : videoIntroCODE,
				autoplay : true
			})
		},
		{
			disabled : true,
			divider  : true,
			labelKey : 'ui.help_menu.options.intro_flow.title',
			onClick  : () => safeOpenVideoModal({
				url      : videoIntroCODE,
				autoplay : true
			})
		},
		{
			disabled : true,
			labelKey : 'ui.help_menu.options.intro_block.title',
			onClick  : () => safeOpenVideoModal({
				url      : videoIntroBlock,
				autoplay : true
			})
		},
		{
			disabled : true,
			labelKey : 'ui.help_menu.options.intro_text.title',
			onClick  : () => safeOpenVideoModal({
				url      : videoIntroText,
				autoplay : true
			})
		},
		{
			disabled : true,
			divider  : true,
			labelKey : 'ui.help_menu.options.troubleshooting.title',
			onClick  : () => safeOpenVideoModal({
				url      : videoTroubleshooting,
				autoplay : true
			})
		},
		{
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
	safeOpenVideoModal   : PropTypes.func,
	videoIntroCODE       : PropTypes.string,
	videoIntroFlow       : PropTypes.string,
	videoIntroBlock      : PropTypes.string,
	videoIntroText       : PropTypes.string,
	videoTroubleshooting : PropTypes.string,
}

export default HelpMenu

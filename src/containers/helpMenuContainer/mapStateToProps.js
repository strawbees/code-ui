import { createStructuredSelector } from 'reselect'
import makeStringSelector from 'src/selectors/makeStringSelector'

export default () => createStructuredSelector({
	videoIntroCODE       : makeStringSelector('ui.help_menu.options.intro_code.video'),
	videoIntroFlow       : makeStringSelector('ui.help_menu.options.intro_flow.video'),
	videoIntroBlock      : makeStringSelector('ui.help_menu.options.intro_block.video'),
	videoIntroText       : makeStringSelector('ui.help_menu.options.intro_text.video'),
	videoTroubleshooting : makeStringSelector('ui.help_menu.options.troubleshooting.video'),
})

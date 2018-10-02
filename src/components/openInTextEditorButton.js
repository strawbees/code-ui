import React from 'react'
import PropTypes from 'prop-types'
import Link from 'src/components/link'
import IconButton from 'src/components/iconButton'
import { WHITE, BLACK } from 'src/constants/colors'

const OpenInTextEditorButton = ({
	url,
	onClick,
}) =>
	<div className='root openInTextEditorButton'>
		<Link to={url} onClick={onClick}>
			<IconButton
				labelKey='ui.editor.text_preview.create'
				textColor={WHITE}
				textHoverColor={WHITE}
				bgColor={BLACK}
				bgHoverColor={BLACK}
			/>
		</Link>
	</div>

OpenInTextEditorButton.propTypes = {
	onClick : PropTypes.func,
}

export default OpenInTextEditorButton

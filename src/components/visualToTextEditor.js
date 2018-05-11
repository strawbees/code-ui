import React from 'react'
import PropTypes from 'prop-types'
import S from 'src/containers/sManager'
import MirrorEditorContainer from 'src/containers/mirrorEditorContainer'

class VisualToTextEditor extends React.Component {
	state = {
		displayVisual : true
	}
	showVisual = () => {
		this.setState({ displayVisual : true })
	}
	showText = () => {
		this.setState({ displayVisual : false })
	}
	render() {
		const {
			generatedCode,
			VisualEditor,
			...visualEditorProps
		} = this.props

		const {
			showVisual,
			showText
		} = this

		const { displayVisual } = this.state

		return (
			<div className='root visualToTextEditor'>
				<style jsx>{`
					.root {
						position: relative;
						width: 100%;
						height: 100%;
					}
					.switch {
						background-color: white;
						position: absolute;
						top: 0;
						right: 0;
						display: flex;
						flex-direction: row;
						z-index: 100;
					}
					.switch.visual .visual {
						font-weight: bold
					}
					.switch.text .text {
						font-weight: bold
					}
					.editor {
						position: absolute;
						top: 0;
						left: 0;
						width: 100%;
						height: 100%;
					}
					.editor.text :global(>*:nth-child(1)) {
						display: none;
					}
					.editor.visual :global(>*:nth-child(2)) {
						/* setting display:none on ace editor will cause
						* it to not update it's value.
						* @see: https://github.com/ajaxorg/ace/issues/2497
						*/
						transform: scale3d(0,0,0);
					}
				`}</style>
				<div className={`editor ${displayVisual ? 'visual' : 'text'}`}>
					<VisualEditor {...visualEditorProps} />
					<MirrorEditorContainer/>
				</div>
				<div className={`switch ${displayVisual ? 'visual' : 'text'}`}>
					<div onClick={showVisual}
						className='visual'>
						<S value='ui.editor.switch.visual'/>
					</div>
					<div onClick={showText}
						className='text'>
						<S value='ui.editor.switch.text'/>
					</div>
				</div>
			</div>
		)
	}
}

VisualToTextEditor.propTypes = {
	VisualEditor : PropTypes.func
}

export default VisualToTextEditor

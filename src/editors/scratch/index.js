import React from 'react'
import PropTypes from 'prop-types'
import tinycolor from 'tinycolor2'
import withScript from 'src/hoc/withScript'
import Spinner from 'src/components/spinner'
import debounce from 'src/utils/debounce'
import toolboxToXmlString from './utils/toolboxToXmlString'
import blocks from './blocks/index'
import toolbox from './toolbox'
import { WHITE } from 'src/constants/colors'

class ScratchEditor extends React.Component {
	constructor(props) {
		super(props)
		this.mainWorkspaceContainer = React.createRef()
	}

	loadSource(source) {
		const {
			Blockly
		} = window
		Blockly.getMainWorkspace().clear()
		Blockly.Xml.domToWorkspace(
			Blockly.Xml.textToDom(source),
			Blockly.getMainWorkspace()
		)
	}

	componentDidMount() {
		const {
			Blockly
		} = window

		const {
			strings
		} = this.props
		// Load and register all blocks
		Object.keys(blocks).forEach(id => {
			const { definition } = blocks[id]
			if (definition) {
				Blockly.Blocks[id] = {
					/* eslint-disable object-shorthand */
					/* eslint-disable func-names */
					init : function () { this.jsonInit(definition(strings)) }
					/* eslint-enable object-shorthand */
					/* eslint-enable func-names */
				}
			}
			delete Blockly.Blocks.data_showvariable
			delete Blockly.Blocks.data_hidevariable
			delete Blockly.Blocks.data_showlist
			delete Blockly.Blocks.data_hidelist
		})
		// Load toolbox
		const toolboxXmlString = toolboxToXmlString(toolbox(strings))
		const toolboxXml = Blockly.Xml.textToDom(toolboxXmlString)

		// Setup workspace
		const { mainWorkspaceContainer } = this
		this.mainWorkspace = Blockly.inject(mainWorkspaceContainer.current, {
			toolbox : toolboxXml,
			media   : '/static/lib/scratch-blocks/media/',
			zoom    : {
				controls   : true,
				wheel      : true,
				startScale : 0.8
			},
			trashcan : true,
			colours  : {
				scrollbar : 'rgba(0, 0, 0, 0.05)',
			}
		})

		// Handle the source changes
		const {
			onSourceChange,
			refEditorSource
		} = this.props
		this.source = refEditorSource
		Blockly.getMainWorkspace().addChangeListener((e) => {
			// It seems that if we call .workspaceToDom on ALL changes, lots
			// of spurious variables are created. I could not single out what
			// is the offending event, but UI seems a obvious one to avoid.
			// Still, it's not 100% solid, so added a debounce, that seems to
			// solve the issue.
			if (e.type === 'ui') {
				return
			}
			debounce('update scratch source', () => {
				const xml = Blockly.Xml.workspaceToDom(Blockly.getMainWorkspace())
				const currentSource = Blockly.Xml.domToText(xml)
				if (this.source !== currentSource) {
					this.source = currentSource
					onSourceChange(currentSource)
				}
			}, 1000)
		})
		// Load the initial source
		this.loadSource(refEditorSource)
	}

	compomnentWillUnmount() {
		window.Blockly.getMainWorkspace().dispose()
	}

	componentDidUpdate() {
		const { refEditorSource } = this.props
		const { source } = this
		if (refEditorSource !== source) {
			this.loadSource(refEditorSource)
		}
	}

	render() {
		return (
			<div className='root editor scratch'>
				<style jsx>{`
					.root {
						position: relative;
						width: 100%;
						height: 100%;
					}
					.workspace  {
						position: absolute;
						width: 100%;
						height: 100%;
						background-color: ${tinycolor(WHITE).toRgbString()};
					}
					.workspace :global(.blocklyFlyout) {
						border: solid 1px rgba(0,0,0,0.1);
						border-top: none;
						border-bottom: none;
					}
				`}</style>
				<div
					className='workspace'
					ref={ this.mainWorkspaceContainer }
				/>
			</div>
		)
	}
}

ScratchEditor.propTypes = {
	strings         : PropTypes.object,
	refEditorSource : PropTypes.string,
	onSourceChange  : PropTypes.func
}

const ScratchEditorWithStrings = (props) => {
	// as the editor breaks if the correct strings are not in place,
	// we need to make sure they are loaded before diplaying it
	if (!props.strings) {
		return <Spinner />
	}
	return (
		<ScratchEditor {...props}/>
	)
}

const ScratchEditorWithScript = withScript(
	['/static/lib/scratch-blocks/vertical.js'],
	ScratchEditorWithStrings,
	Spinner
)
export default ScratchEditorWithScript

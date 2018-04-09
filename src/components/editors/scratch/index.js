import React from 'react'
import withScript from 'src/hoc/withScript'
import Spinner from 'src/components/spinner'
import toolboxToXmlString from './utils/toolboxToXmlString'
import parsing from './utils/parsing'
import blocks from './blocks/index'
import toolbox from './toolbox'

const {
	// assembleStructure,
	// parseBlock,
	registerGenerator
} = parsing

class ScratchEditor extends React.Component {
	constructor(props) {
		super(props)
		this.mainWorkspaceContainer = React.createRef()
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
			const {
				definition,
				generator
			} = blocks[id]

			if (definition) {
				Blockly.Blocks[id] = {
					/* eslint-disable object-shorthand */
					/* eslint-disable func-names */
					init : function () { this.jsonInit(definition(strings)) }
					/* eslint-enable object-shorthand */
					/* eslint-enable func-names */
				}
			}
			if (generator) {
				registerGenerator(id, generator)
			}
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
				startScale : 0.65
			},
			trashcan : true,
			colours  : {
				scrollbar : 'rgba(0, 0, 0, 0.05)',
			}
		})
		const { mainWorkspace } = this

		// Add the default initial block
		Blockly.Xml.domToWorkspace(
			Blockly.Xml.textToDom(
				'<xml><block type="event_power_on" id="rootblock" deletable="false" x="50" y="50"></xml>'
			),
			mainWorkspace
		)

		// Handle the source changes
		const { onSourceCodeChange } = this.props
		let tempSource = null
		mainWorkspace.addChangeListener(() => {
			const xml = Blockly.Xml.workspaceToDom(mainWorkspace)
			const source = Blockly.Xml.domToPrettyText(xml)
			if (tempSource !== source) {
				tempSource = source
				onSourceCodeChange(source)
			}
		})
	}

	compomnentWillUnmount() {
		const { mainWorkspace } = this
		mainWorkspace.dispose()
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
						background-color: white;
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

import React from 'react'
import withScript from 'src/components/hoc/withScript'
import xmlToJson from './utils/xmlToJson'
import toolboxToXmlString from './utils/toolboxToXmlString'
import parsing from './utils/parsing'
import blocks from './blocks/index'
import toolbox from './toolbox'

const {
	assembleStructure,
	parseBlock,
	registerGenerator
} = parsing

class Editor extends React.Component {
	componentWillReceiveProps(){
		console.log('componentWillReceiveProps')
	}
	componentDidMount() {
		const {
			Blockly
		} = window

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
					init : function () { this.jsonInit(definition()) }
					/* eslint-enable object-shorthand */
					/* eslint-enable func-names */
				}
			}
			if (generator) {
				registerGenerator(id, generator)
			}
		})
		// Load toolbox
		const toolboxXmlString = toolboxToXmlString(toolbox)
		const toolboxXml = Blockly.Xml.textToDom(toolboxXmlString)

		// Setup workspace
		const { mainWorkspaceContainer } = this
		this.mainWorkspace = Blockly.inject(mainWorkspaceContainer, {
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
				'<xml><block type="event_power_on" deletable="false" x="50" y="50"></xml>'
			),
			mainWorkspace
		)
	}

	compomnentWillUnmount() {
		const { mainWorkspace } = this
		mainWorkspace.dispose()
	}

	assignMainWorkspaceContainer(e) {
		this.mainWorkspaceContainer = e
	}

	render() {
		let {
			assignMainWorkspaceContainer
		} = this
		assignMainWorkspaceContainer = assignMainWorkspaceContainer.bind(this)

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
					ref={ assignMainWorkspaceContainer }
				/>
			</div>
		)
	}
}

export default withScript(
	['/static/lib/scratch-blocks/vertical.js'],
	Editor
)

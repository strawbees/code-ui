import React from 'react'
import PropTypes from 'prop-types'
import tinycolor from 'tinycolor2'
import IconButton from 'src/components/iconButton'
import Spinner from 'src/components/spinner'
import plusIcon from 'src/assets/icons/general/plus.svg'
import debounce from 'src/utils/debounce'
import sortBlocklyDomNode from 'src/utils/sortBlocklyDomNode'
import {
	GRAY,
	WHITE,
	BLUE
} from 'src/constants/colors'
import toolboxToXmlString from './utils/toolboxToXmlString'
import blocks from './blocks/index'
import toolbox from './toolbox'

class Container extends React.Component {
	constructor(props) {
		super(props)
		this.ref = React.createRef()
	}

	componentDidMount() {
		this.props.onMount(this.ref.current)
	}

	render() {
		return (
			<React.Fragment>
				<style jsx>{`
					.workspace {
						box-sizing: border-box;
						width: calc(100%);
						height: 100px;
					}
					.controls {
						display: flex;
						flex-direction: row;
						align-items: center;
						justify-content: center;
						margin-bottom: 0.5rem;
					}
					.controls :global(> *) {
						margin: 0 0.25rem;
					}
				`}</style>
				<div className='controls'>
					<IconButton
						icon={plusIcon}
						labelKey='block.procedures.add_number'
						onClick={this.props.onAddNumber}
						textColor={WHITE}
						textHoverColor={WHITE}
						bgColor={BLUE}
						bgHoverColor={BLUE}
					/>
					<IconButton
						icon={plusIcon}
						labelKey='block.procedures.add_boolean'
						onClick={this.props.onAddBoolean}
						textColor={WHITE}
						textHoverColor={WHITE}
						bgColor={BLUE}
						bgHoverColor={BLUE}
					/>
					<IconButton
						icon={plusIcon}
						labelKey='block.procedures.add_label'
						onClick={this.props.onAddLabel}
						textColor={WHITE}
						textHoverColor={WHITE}
						bgColor={BLUE}
						bgHoverColor={BLUE}
					/>
				</div>
				<div className='workspace' ref={this.ref}/>
			</React.Fragment>
		)
	}
}

class BlockEditor extends React.Component {
	constructor(props) {
		super(props)
		this.mainWorkspaceContainer = React.createRef()
	}

	loadSource = (source) => {
		const {
			Blockly
		} = window
		this.mainWorkspace.clear()

		// important to sort the xml here, beacuse some sources may have the
		// "<variables>" node in the end, and that will cause a bug on blockly
		// once it loads it.
		const sourceXml = Blockly.Xml.textToDom(source)
		sortBlocklyDomNode(sourceXml)

		Blockly.Xml.domToWorkspace(
			sourceXml,
			this.mainWorkspace
		)
		// eslint-disable-next-line no-underscore-dangle
		this.mainWorkspace.refreshToolboxSelection_()
	}

	componentDidMount() {
		const {
			Blockly
		} = window

		const {
			strings,
			mediaPath
		} = this.props
		// Load the correct strings
		Blockly.Msg = strings['_scracth-blocks']

		// Load and register all blocks
		Object.keys(blocks).forEach(id => {
			const { definition } = blocks[id]
			if (definition) {
				Blockly.Blocks[id] = {
					/* eslint-disable-next-line object-shorthand,func-names */
					init : function () { this.jsonInit(definition(strings)) }
				}
			}
			delete Blockly.Blocks.data_showvariable
			delete Blockly.Blocks.data_hidevariable
			delete Blockly.Blocks.data_showlist
			delete Blockly.Blocks.data_hidelist
			delete Blockly.Blocks.data_listcontents
		})
		// Load toolbox
		const toolboxXmlString = toolboxToXmlString(toolbox(strings))
		const toolboxXml = Blockly.Xml.textToDom(toolboxXmlString)
		delete window.Blockly.Blocks.defaultToolbox

		// Setup workspace
		const { mainWorkspaceContainer } = this
		this.mainWorkspace = Blockly.inject(mainWorkspaceContainer.current, {
			toolbox : toolboxXml,
			media   : mediaPath,
			sounds  : false,
			zoom    : {
				controls   : true,
				wheel      : true,
				startScale : 0.66
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
		this.mainWorkspace.addChangeListener((e) => {
			// It seems that if we call .workspaceToDom on ALL changes, lots
			// of spurious variables are created. I could not single out what
			// is the offending event, but UI seems a obvious one to avoid.
			// Still, it's not 100% solid, so added a debounce, that seems to
			// solve the issue.
			if (e.type === 'ui' ||
				e.type === 'var_create' ||
				e.type === 'create'
			) {
				return
			}

			this.cancelSourceUpdate = debounce('update block source', () => {
				const xml = Blockly.Xml.workspaceToDom(this.mainWorkspace)
				// it's importat to sort the node before comparing it, as
				// sometimes blockly will change the internal order of the Xml
				// nodes, causing the comparisson to be a false positive, and
				// that causes all sorts of problems
				sortBlocklyDomNode(xml)
				const currentSource = Blockly.Xml.domToText(xml)
				if (this.source !== currentSource) {
					this.source = currentSource
					onSourceChange(currentSource)
				}
			}, 1000)
		})
		// Load the initial source
		this.loadSource(refEditorSource)

		// Override blockly prompt with custom dialogue
		this.originalBlocklyPrompt = window.Blockly.prompt
		window.Blockly.prompt = this.props.openPrompt

		// Handle custom blocks creation
		// Setup workspace
		this.proceduresMutationRoot = null
		this.proceduresCallback = null
		window.Blockly.Procedures.externalProcedureDefCallback = async (mutation, cb) => {
			const setup = (container) => {
				if (this.proceduresWorkspace) {
					this.proceduresWorkspace.dispose()
				}
				this.proceduresWorkspace = Blockly.inject(container, {
					media : mediaPath,
					zoom  : {
						startScale : 0.66
					},
					colours : {
						scrollbar : 'rgba(0, 0, 0, 0)',
					},
					scrollbars : true
				})
				this.proceduresWorkspace.addChangeListener(() => {
					if (this.proceduresMutationRoot) {
						this.proceduresMutationRoot.onChangeFn()
					}
				})
				this.proceduresCallback = cb
				this.proceduresWorkspace.clear()
				this.proceduresMutationRoot = this.proceduresWorkspace.newBlock('procedures_declaration')
				this.proceduresMutationRoot.translate(20, 45)
				// this.proceduresMutationRoot.setMovable(false)
				this.proceduresMutationRoot.domToMutation(mutation)
				this.proceduresMutationRoot.initSvg()
				this.proceduresMutationRoot.render(false)
			}
			this.props.openDialog(
				{
					titleKey        : 'block.procedures.title',
					confirmLabelKey : 'block.procedures.confirm',
					onConfirm       : () => {
						const newMutation = this.proceduresMutationRoot.mutationToDom(/* opt_generateShadows */ true)
						this.proceduresCallback(newMutation)
						this.proceduresCallback = null
						this.proceduresMutationRoot = null
						this.proceduresWorkspace.clear()
						// eslint-disable-next-line no-underscore-dangle
						this.mainWorkspace.refreshToolboxSelection_()
					},
					onCancel : () => {
						this.proceduresCallback = null
						this.proceduresMutationRoot = null
						this.proceduresWorkspace.clear()
						// eslint-disable-next-line no-underscore-dangle
						this.mainWorkspace.refreshToolboxSelection_()
					}
				},
				<Container
					onMount={setup}
					onAddNumber={() => this.proceduresMutationRoot.addStringNumberExternal()}
					onAddBoolean={() => this.proceduresMutationRoot.addBooleanExternal()}
					onAddLabel={() => this.proceduresMutationRoot.addLabelExternal()}
				/>
			)
		}
	}

	componentWillUnmount() {
		if (this.cancelSourceUpdate) {
			this.cancelSourceUpdate()
		}
		this.mainWorkspace.dispose()

		// restore blockly prompt
		if (this.originalBlocklyPrompt) {
			window.Blockly.prompt = this.originalBlocklyPrompt
			delete this.originalBlocklyPrompt
		}
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
			<div className='root editor block'>
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
					.procedures {
						position: fixed;
						top: 0;
						left: 0;
						bottom: 0;
						right: 0;
						display: flex;
						flex-direction: row;
						align-items: center;
						justify-content: center;
						background-color: ${tinycolor(GRAY).setAlpha(0.5)};
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

BlockEditor.propTypes = {
	mediaPath       : PropTypes.string,
	strings         : PropTypes.object,
	refEditorSource : PropTypes.string,
	onSourceChange  : PropTypes.func,
	openDialog      : PropTypes.func,
	openPrompt      : PropTypes.func,
}

const BlockEditorWithStrings = (props) => {
	// as the editor breaks if the correct strings are not in place,
	// we need to make sure they are loaded before diplaying it
	if (!props.strings) {
		return <Spinner />
	}
	return (
		<BlockEditor {...props}/>
	)
}
export default BlockEditorWithStrings

// after finding numerous bugs with blockly remounting, decided to skip the
// dynamic loading of the script file and just load blockly on the <head>
// instead, like a normal script...
// const BlockEditorWithScript = ({
// 	scriptPath,
// 	...props
// }) => {
// 	const Editor = withScript(
// 		[scriptPath],
// 		BlockEditorWithStrings,
// 		Spinner
// 	)
// 	return <Editor {...props}/>
// }
// export default BlockEditorWithScript

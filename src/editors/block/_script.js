import xmlToJson from './xmlToJson.js'
import toolboxToXmlString from './toolboxToXmlString.js'
import parsing from './parsing.js'

const {
	assembleStructure,
	parseBlock,
	registerGenerator
} = parsing

const blocksIds = [
	'control_forever',
	'control_if',
	'control_if_else',
	'control_repeat',
	'control_repeat_until',
	'control_wait',
	'control_wait_until',
	'data_changevariableby',
	'data_setvariableto',
	'data_variable',
	'event_power_on',
	'input_circuit_touch',
	'input_light_sensor',
	'math_number',
	'math_positive_number',
	'math_whole_number',
	'operator_add',
	'operator_and',
	'operator_divide',
	'operator_equals',
	'operator_gt',
	'operator_lt',
	'operator_mathop',
	'operator_mod',
	'operator_multiply',
	'operator_not',
	'operator_or',
	'operator_random',
	'operator_round',
	'operator_subtract',
	'output_continuous_servo_direction',
	'output_continuous_servo_speed',
	'output_led',
	'output_led_dual_color_color',
	'output_led_dual_color_light',
	'output_servo',
	'text',
	'undefined'
]

/* const setLocale = locale => {}
const load = xml => {}
const save = () => xml
const getCode = () => {} */
const init = async () => {
	// Load and register all blocks
	const [definitions, generators] = await Promise.all([
		Promise.all(
			blocksIds.map(id => import(`./blocks/${id}/definition.js`))
		),
		Promise.all(
			blocksIds.map(id => import(`./blocks/${id}/generator.js`))
		)
	])
	blocksIds.forEach((id, index) => {
		const definition = definitions[index].default
		const generator = generators[index].default
		if (definition) {
			Blockly.Blocks[id] = {
				init() { this.jsonInit(definition) }
			}
		}
		if (generator) {
			registerGenerator(id, generator)
		}
	})
	// Load toolbox
	const toolbox = (await import('./toolbox.js')).default
	const toolboxXmlString = toolboxToXmlString(toolbox)
	const toolboxXml = Blockly.Xml.textToDom(toolboxXmlString)

	// Setup workspace
	const mainWorkspaceContainer = document.getElementById('mainWorkspace')
	const mainWorkspace = Blockly.inject(mainWorkspaceContainer, {
		toolbox : toolboxXml,
		media   : '../node_modules/block-blocks/media/',
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
	/* let callback = null
	let mutationRoot = null
	const proceduresWorkspaceContainer = document.getElementById('proceduresWorkspace')
	const proceduresWorkspace = Blockly.inject(proceduresWorkspaceContainer, {
		toolbox: 'aaa',
		media: '../node_modules/block-blocks/media/',
		colours: {
			scrollbar: 'rgba(0, 0, 0, 0.05)',
		}
	})
	proceduresWorkspace.addChangeListener(function() {
		if (mutationRoot) {
			mutationRoot.onChangeFn();
		}
	})
	Blockly.Procedures.externalProcedureDefCallback = (mutation, cb) => {
		//editorActions.style.visibility = 'visible';
		proceduresWorkspaceContainer.style.visibility = 'visible'
		callback = cb
		mainWorkspace.clear()
		mutationRoot = mainWorkspace.newBlock('procedures_declaration')
		mutationRoot.domToMutation(mutation)
		mutationRoot.initSvg()
		mutationRoot.render(false)
	}

	function applyMutation() {
	  callback(mutationRoot.mutationToDom());
	  callback = null;
	  mutationRoot = null;
	  mainWorkspace.clear();
	  proceduresWorkspace.refreshToolboxSelection_()
	  editorActions.style.visibility = 'hidden';
	}

	function addLabel() {
	  mutationRoot.addLabelExternal();
	}

	function addBoolean() {
	  mutationRoot.addBooleanExternal();
	}

	function addTextNumber() {
	  mutationRoot.addStringNumberExternal();
	}

	function removeRandomInput() {
	  var rnd = Math.floor(Math.random() * mutationRoot.inputList.length);
	  mutationRoot.removeInput(mutationRoot.inputList[rnd].name);
	  mutationRoot.onChangeFn();
	  mutationRoot.updateDisplay_();
	}

	function addRandomInput() {
	  var rnd = Math.floor(Math.random() * 3);
	  switch (rnd) {
		case 0:
		  addTextNumber();
		  break;
		case 1:
		  addLabel();
		  break;
		case 2:
		  addBoolean();
		  break;
	  }
	}

	function cancel() {
	  callback = null;
	  mutationRoot = null;
	  mainWorkspace.clear();
	  proceduresWorkspace.refreshToolboxSelection_()
	  proceduresWorkspaceContainer.style.visibility = 'hidden';
	} */

	Blockly.Xml.domToWorkspace(
		Blockly.Xml.textToDom('<xml><block type="event_power_on" deletable="false" x="50" y="50"></xml>'),
		mainWorkspace
	)

	const boundGenerateCode = () => generateCode(mainWorkspace)
	mainWorkspace.addChangeListener(boundGenerateCode)
	boundGenerateCode(mainWorkspace)
}
init()

const generateCode = (workspace) => {
	console.clear()
	const xml = Blockly.Xml.workspaceToDom(workspace)
	console.log('xml', xml)
	const json = xmlToJson(xml)
	console.log('json', json)
	const structure = {
		header             : '#include "Quirkbot.h"\n',
		definitions        : {},
		oneTimeAssignments : {},
		body               : ''
	}
	const start = json && json.block && json.block[0]
	parseBlock(start, structure)
	const code = assembleStructure(structure)
	console.log('code', code)
}

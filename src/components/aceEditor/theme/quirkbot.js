import tinycolor from 'tinycolor2'
import {
	PINK,
	GREEN,
	BLUE,
	GREY,
	YELLOW_LIGHT
} from 'src/constants/colors'

window.ace.define('ace/theme/quirkbot', ['require', 'exports', 'module', 'ace/lib/dom'], (acequire, exports) => {
	exports.isDark = true
	exports.cssClass = 'ace-quirkbot'
	exports.cssText = `
	.ace-quirkbot .ace_gutter {
		background: #333541;
		color: rgb(144,145,148, 0.5);
	}
	.ace-quirkbot .ace_print-margin {
		width: 1px;
		background: #e8e8e8;
	}
	.ace-quirkbot {
		background-color: #282a36;
		color: rgba(255,255,255,0.9);
	}
	.ace-quirkbot .ace_punctuation,
	.ace-quirkbot .ace_paren{
		color: rgba(255,255,255,0.4);
	}
	.ace-quirkbot .ace_cursor {
		color: #f8f8f0;
	}
	.ace-quirkbot .ace_marker-layer .ace_selection {
		background: #44475a;
	}
	.ace-quirkbot.ace_multiselect .ace_selection.ace_start {
		box-shadow: 0 0 3px 0px #282a36;
		border-radius: 2px;
	}
	.ace-quirkbot .ace_marker-layer .ace_step {
		background: rgb(198, 219, 174);
	}
	.ace-quirkbot .ace_marker-layer .ace_bracket {
		margin: -1px 0 0 -1px;
		border: 1px solid #3B3A32;
	}
	.ace-quirkbot .ace_marker-layer .ace_active-line,
	.ace-quirkbot .ace_gutter-active-line {
		background-color: rgba(255,255,255,0.05);
	}
	.ace-quirkbot .ace_marker-layer .ace_selected-word {
		border: 1px solid #44475a;
	}
	.ace-quirkbot .ace_fold {
		background-color: #50fa7b;
		border-color: #f8f8f2;
	}
	.ace-quirkbot .ace_keyword {
		color: #ff79c6;
	}
	.ace-quirkbot .ace_keyword_precompiler {
		color: rgba(255,255,255,0.4);
	}
	.ace-quirkbot .ace_constant.ace_language {
		color: #bd93f9;
	}
	.ace-quirkbot .ace_constant.ace_numeric {
		color: #bd93f9;
	}
	.ace-quirkbot .ace_constant.ace_character {
		color: #bd93f9;
	}
	.ace-quirkbot .ace_constant.ace_character.ace_escape {
		color: #ff79c6;
	}
	.ace-quirkbot .ace_constant.ace_other {
		color: rgba(255,255,255,0.5);
	}
	.ace-quirkbot .ace_support.ace_function {
		color: #8be9fd;
	}
	.ace-quirkbot .ace_support.ace_type,
	.ace-quirkbot .ace_support.ace_class {
		font-weitgh: bold;
	}
	.ace-quirkbot .ace_support.ace_class.ace_input,
	.ace-quirkbot .ace_support.ace_class.ace_brains,
	.ace-quirkbot .ace_support.ace_class.ace_output,
	.ace-quirkbot .ace_support.ace_class.ace_debug{
		color: rgba(255,255,255,0.9);
		border-radius: 3px;
	}
	.ace-quirkbot .ace_support.ace_class.ace_input {
		background-color: ${tinycolor(BLUE).toRgbString()};
	}
	.ace-quirkbot .ace_support.ace_class.ace_brains {
		background-color: ${tinycolor(GREEN).toRgbString()};
	}
	.ace-quirkbot .ace_support.ace_class.ace_output {
		background-color: ${tinycolor(PINK).toRgbString()};
	}
	.ace-quirkbot .ace_support.ace_class.ace_debug {
		background-color: ${tinycolor(GREY).toRgbString()};
	}
	.ace-quirkbot .ace_support.ace_parameter,
	.ace-quirkbot .ace_support.ace_outlet,
	.ace-quirkbot .ace_support.ace_function,
	.ace-quirkbot .ace_support.ace_connection {
		color: rgba(255,255,255,0.6);
	}
	.ace-quirkbot .ace_support.ace_constant {
		color: #bd93f9;
	}
	.ace-quirkbot .ace_storage {
		color: #ff79c6;
	}
	.ace-quirkbot .ace_storage.ace_type {
		font-style: italic;
	}
	.ace-quirkbot .ace_invalid {
		color: #F8F8F0;
		background-color: #ff79c6;
	}
	.ace-quirkbot .ace_invalid.ace_deprecated {
		color: #F8F8F0;
		background-color: #bd93f9;
	}
	.ace-quirkbot .ace_string {
		color: #f1fa8c;
	}
	.ace-quirkbot .ace_comment {
		color: #6272a4;
	}
	.ace-quirkbot .ace_variable {
		color: #50fa7b;
	}
	.ace-quirkbot .ace_variable.ace_parameter {
		font-style: italic;
		color: #ffb86c;
	}
	.ace-quirkbot .ace_entity.ace_other.ace_attribute-name {
		color: #50fa7b;
	}
	.ace-quirkbot .ace_entity.ace_name.ace_function {
		color: #50fa7b;
	}
	.ace-quirkbot .ace_entity.ace_name.ace_tag {
		color: #ff79c6;
	}

	`
	const dom = acequire('../lib/dom')
	dom.importCssString(exports.cssText, exports.cssClass)
})

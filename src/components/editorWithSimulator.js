import React from 'react'
import PropTypes from 'prop-types'
import TabButton from 'src/components/tabButton'
import ExpandIcon from 'src/simulator/assets/images/general/expand.svg'
import CollapseIcon from 'src/simulator/assets/images/general/collapse.svg'
import SimulatorVMManager from 'src/simulator/containers/simulatorVMManager'
import QuirkbotSimulatorContainer from 'src/simulator/containers/quirkbotSimulatorContainer'

import {
	GRAY,
	WHITE,
} from 'src/constants/colors'

const EditorWithSimulator = ({
	children,
	isSimulatorVisible,
	showSimulator,
	hideSimulator,
}) =>
	<div className='root editorWithSimulator'>
		<style jsx>{`
			.root {
				position: relative;
				width: 100%;
				height: 100%;
				overflow: hidden;
				display: flex;
				flex-direction:row;
			}
			.editor {
				flex: 1;
				position: relative;
				height: 100%;
			}
			.editor :global(.simulator-toggle) {
				position: absolute;
				right: -0.175rem;
				top: calc(50% - 6rem);
				z-index: 50;
				transform: rotate(270deg);
				transform-origin: 100% 100%;
			}
			.simulator-container {
				z-index: 1;
				box-shadow: -2px 0px 3px 0px rgba(50, 50, 50, 0.3);
				overflow-y: scroll;
			}
			.simulator-container :global(> *) {
				width: 20vw;
				min-width: 20em;
				min-height: 100%;
			}
		`}</style>
		<SimulatorVMManager/>
		<div className='editor'>
			{children}
			<TabButton
				className='simulator-toggle'
				textColor={WHITE}
				bgColor={GRAY}
				textHoverColor={WHITE}
				bgHoverColor={GRAY}
				icon={isSimulatorVisible ? ExpandIcon : CollapseIcon}
				labelKey='simulalor.button.show_hide'
				onClick={isSimulatorVisible ? hideSimulator : showSimulator}
			/>
		</div>
		{isSimulatorVisible &&
			<div className='simulator-container'>
				<QuirkbotSimulatorContainer />
			</div>
		}
	</div>

EditorWithSimulator.propTypes = {
	children           : PropTypes.element.isRequired,
	isSimulatorVisible : PropTypes.bool,
	showSimulator      : PropTypes.func,
	hideSimulator      : PropTypes.func,
}

export default EditorWithSimulator

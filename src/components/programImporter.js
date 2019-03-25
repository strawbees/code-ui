import React from 'react'
import Dropzone from 'react-dropzone'
import PropTypes from 'prop-types'
import tinycolor from 'tinycolor2'
import IconButton from 'src/components/iconButton'
import S from 'src/containers/sManager'
import ProgramDataButtonContainer from 'src/containers/programDataButtonContainer'
import fileIcons from 'src/assets/icons/file'
import {
	GRAY,
	GREEN,
	RED,
} from 'src/constants/colors'

class ProgramImporter extends React.Component {
	state = {
		invalid : false,
		program : null
	}

	onDrop = async (files) => {
		const file = files[0]
		if (!file) {
			return
		}
		window.URL.revokeObjectURL(file.preview)
		const reader = new FileReader()
		let program
		try {
			const programString = await new Promise((resolve, reject) => {
				reader.onload = () => {
					resolve(reader.result)
				}
				reader.onabort = reject
				reader.onerror = reject
				reader.readAsBinaryString(file)
			})
			program = JSON.parse(programString)
		} catch (error) {
			this.setState({ invalid : true })
			setTimeout(() => this.setState({ invalid : false }), 5000)
			return
		}
		if ((program.type !== 'flow' &&
			program.type !== 'block' &&
			program.type !== 'text') ||
			!program.source) {
			this.setState({ invalid : true })
			setTimeout(() => this.setState({ invalid : false }), 5000)
			return
		}
		this.setState({ program })
	}

	render() {
		const {
			invalid,
			program
		} = this.state
		const {
			onProgramClick,
		} = this.props

		return (
			<div className={`root programImporter ${invalid ? 'invalid' : ''}`}>
				<style jsx>{`
					.root {
						position: relative;
						display: flex;
						flex-direction: column;
						width: 25rem;
						height: 11rem;
						max-width: 100%;
					}
					.root .programContainer {
						height: 100%;
						border: solid 0.2rem ${tinycolor(GREEN).setAlpha(0.5).toRgbString()};
						background-color: ${tinycolor(GREEN).setAlpha(0.1).toRgbString()};
						border-radius: 0.5rem;
						position: relative;
						display: flex;
						flex-direction: column;
						align-items: center;
						padding: 1rem;
						justify-content: center;
						color: ${tinycolor(GREEN).darken(10).toRgbString()};
					}
					.root .programContainer :global(.programButton) {
						margin-top: 1rem;
					}
					.root .programContainer :global(.programButton .name) {
						width: auto;
					}
					.root :global(.dropzone) {
						height: 100%;
						padding: 1rem;
						text-align: center;
						border: dashed 0.2rem ${tinycolor(GRAY).setAlpha(0.5).toRgbString()};
						background-color: ${tinycolor(GRAY).setAlpha(0.1).toRgbString()};
						border-radius: 0.5rem;
						position: relative;
					}
					.root :global(.dropzone),
					.root :global(.dropzone > *) {
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
					}
					.root :global(.dropzone.active:not(.reject)) {
						border: dashed 0.2rem ${tinycolor(GREEN).setAlpha(0.5).toRgbString()};
						background-color: ${tinycolor(GREEN).setAlpha(0.1).toRgbString()};
					}
					.root :global(.dropzone.reject),
					.root.invalid :global(.dropzone) {
						border: dashed 0.2rem ${tinycolor(RED).setAlpha(0.5).toRgbString()};
						background-color: ${tinycolor(RED).setAlpha(0.1).toRgbString()};
					}
					.root :global(.dropzone .iddle),
					.root :global(.dropzone .ready),
					.root :global(.dropzone .error) {
						display:  none;
					}
					.root:not(.invalid) :global(.dropzone:not(.active) .iddle),
					.root:not(.invalid) :global(.dropzone.active:not(.reject) .ready),
					.root:not(.invalid) :global(.dropzone.reject .error),
					.root.invalid :global(.dropzone .error) {
						display: flex;
					}
					.root :global(.dropzone .iddle .iconButton) {
						margin-top: 1rem;
					}
					.root :global(.dropzone .ready) {
						color: ${tinycolor(GREEN).darken(10).toRgbString()};
					}
					.root :global(.dropzone .error) {
						color: ${tinycolor(RED).darken(20).toRgbString()};
					}
				`}</style>
				{program !== null &&
					<div className='programContainer'>
						<S value='ui.dialog.import.success'/>
						<ProgramDataButtonContainer
							onClick={onProgramClick}
							{...program}
						/>
					</div>

				}
				{program === null &&
					<Dropzone
						accept='application/json'
						multiple={false}
						onDrop={this.onDrop}>
						{({
							getRootProps,
							getInputProps,
							isDragActive,
							isDragReject
						}) =>
							<div {...getRootProps()}
								className={`dropzone ${isDragActive ? 'active' : ''} ${isDragReject ? 'reject' : ''}`}>
								<input {...getInputProps()} />
								<div className='iddle'>
									<S
										value='ui.dialog.import.drag_file'
									/>
									<IconButton
										icon={fileIcons.folder}
										labelKey='ui.dialog.import.open_file'
									/>
								</div>
								<div className='ready'>
									<S
										value='ui.dialog.import.drop_file'
									/>
								</div>
								<div className='error'>
									<S
										value='ui.dialog.import.reject'
									/>
								</div>
							</div>
						}
					</Dropzone>
				}
			</div>
		)
	}
}

ProgramImporter.propTypes = {
	onProgramClick : PropTypes.func
}

export default ProgramImporter

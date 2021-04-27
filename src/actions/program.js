import FileSaver from 'file-saver'
import {
	compileCode,
	retrieveBootloaderUpdater,
	retrieveFactoryCode,
} from 'src/actions/compiler'
import {
	safeOpenModal,
	safeOpenDialogModal,
	closeModal
} from 'src/actions/modal'
import {
	safeAddProgram,
	safeRemoveProgram,
} from 'src/actions/storage'
import {
	resetEditorProgramByType
} from 'src/actions/editor'
import storageFormatedProgramSelector from 'src/selectors/storageFormatedProgramSelector'
import storageProgramsSelector from 'src/selectors/storageProgramsSelector'
import editorSelector from 'src/selectors/editorSelector'
import programDynamicUrlSelector from 'src/selectors/programDynamicUrlSelector'
import programStaticUrlSelector from 'src/selectors/programStaticUrlSelector'
import storageProgramSelector from 'src/selectors/storageProgramSelector'
import CopyableUrl from 'src/components/copyableUrl'
import FormInput from 'src/components/formInput'
import ProgramMenuFrame from 'src/components/programMenuFrame'
import UploadAreaContainer from 'src/containers/uploadAreaContainer'
import UploadAreaBootloaderUpdaterContainer from 'src/containers/uploadAreaBootloaderUpdaterContainer'
import ProgramImporterContainer from 'src/containers/programImporterContainer'
import blockCompressSource from 'src/editors/block/utils/compressSource'

export const duplicateProgramById = (id, newName) => async (dispatch, getState) => {
	const state = getState()
	const program = storageProgramSelector()(state, { id })
	return dispatch(duplicateProgramData(program, newName))
}
export const duplicateProgramData = (program, newName) => async (dispatch) => {
	const { type, source } = program
	return dispatch(safeAddProgram(type, newName, source))
}
export const removeProgramByIdAndClearEditor = (id) => async (dispatch, getState) => {
	const state = getState()
	const { type } = storageProgramSelector()(state, { id })
	await dispatch(safeRemoveProgram(id))
	const editorId = editorSelector()(state)[type].id
	if (editorId === id) {
		dispatch(resetEditorProgramByType(type))
	}
}
export const exportProgramToFile = (program) => async (dispatch) => {
	if (program.type === 'block') {
		program.source = await blockCompressSource(program.source)
	}
	const string = JSON.stringify(program).replace(/\\"/g, '\'')
	const blob = new Blob([string], { type : 'application/json' })
	FileSaver.saveAs(blob, `${program.name}.json`)
	dispatch(closeModal())
	// // clone the program
	// program = { ...program }
	// const state = getState()
	// const rem = 16
	// // create the canvas
	// const canvas = document.createElement('canvas')
	// canvas.width = 60 * rem
	// canvas.height = 100 * rem
	// canvas.style.width = `${canvas.width * 0.5}px`
	// canvas.style.height = `${canvas.height * 0.5}px`
	// const ctx = canvas.getContext('2d')
	// const roundRect = (x, y, w, h, r) => {
	// 	if (w < 2 * r) r = w / 2
	// 	if (h < 2 * r) r = h / 2
	// 	ctx.beginPath()
	// 	ctx.moveTo(x + r, y)
	// 	ctx.arcTo(x + w, y, x + w, y + h, r)
	// 	ctx.arcTo(x + w, y + h, x, y + h, r)
	// 	ctx.arcTo(x, y + h, x, y, r)
	// 	ctx.arcTo(x, y, x + w, y, r)
	// 	ctx.closePath()
	// }
	// ctx.fillStyle = tinycolor(WHITE).toRgbString()
	// ctx.fillRect(0, 0, canvas.width, canvas.height)
	// ctx.fill()
	// ctx.fillStyle = tinycolor(BLUE).setAlpha(0.5).toRgbString()
	// roundRect(1 * rem, 1 * rem, canvas.width - (2 * rem), canvas.height - (2 * rem), rem)
	// ctx.fill()
	// // create the QR code
	// const {
	// 	publicRuntimeConfig : {
	// 		CANONICAL_URL
	// 	}
	// } = getConfig()
	// const baseUrl = typeof CANONICAL_URL !== 'undefined' ? CANONICAL_URL : ''
	// let urlBase = `${baseUrl}`
	// urlBase += makeStringSelector(`${program.type}.url`)(state)
	// urlBase += '?data='
	// if (program.type === 'block') {
	// 	program.source = await blockCompressSource(program.source)
	// }
	// const url = urlBase + LZString.compressToEncodedURIComponent(JSON.stringify(program))
	// const qr = QR(0, 'L')
	// qr.addData(url)
	// qr.make()
	// const qrImage = document.createElement('img')
	// await new Promise(resolve => {
	// 	qrImage.onload = () => {
	// 		ctx.drawImage(qrImage,
	// 			2 * rem,
	// 			canvas.height - canvas.width - (4 * rem) - (2 * rem),
	// 			canvas.width - (4 * rem),
	// 			canvas.width - (4 * rem)
	// 		)
	// 		resolve()
	// 	}
	// 	qrImage.src = qr.createDataURL(10)
	// })
	// // draw the QR code to the canvas
	// // Download the canvas
	// downloadCanvasToFile(canvas, program.name)
}
// Modal actions
export const modalRemoveProgram = (id) => async (dispatch) => {
	const onConfirm = () => dispatch(removeProgramByIdAndClearEditor(id))
	// important to return the dispatch, so this can be used as a promise
	return dispatch(safeOpenDialogModal(
		{
			titleKey        : 'ui.dialog.remove.title',
			descriptionKey  : 'ui.dialog.remove.description',
			confirmLabelKey : 'ui.dialog.remove.confirm',
			limitWidth      : true,
			onConfirm
		}
	))
}
export const modalDuplicateProgramById = (id) => async (dispatch, getState) => {
	const state = getState()
	const { name } = storageFormatedProgramSelector()(state, { id })
	const allPrograms = storageProgramsSelector()(state)
	const allProgramsByName = Object.keys(allPrograms).reduce((acc, programId) => {
		const program = allPrograms[programId]
		acc[program.name] = program
		return acc
	}, {})
	const regex = / \(([0-9]{1,2})\)$/
	const base = name.replace(regex, '')
	let count = 2
	const composeName = () => `${base} (${count})`
	let newName = composeName()
	while (allProgramsByName[newName]) {
		count++
		newName = composeName()
	}
	const onConfirm = () => {
		dispatch(duplicateProgramById(id, newName))
	}
	return dispatch(safeOpenDialogModal(
		{
			titleKey        : 'ui.dialog.duplicate.title',
			confirmLabelKey : 'ui.dialog.duplicate.confirm',
			// limitWidth      : true,
			onConfirm
		},
		<FormInput
			defaultValue={newName}
			labelKey={'ui.dialog.duplicate.field'}
			onChange={e => newName = e}
		/>,
	))
}
export const modalDuplicateProgramData = (program) => async (dispatch) => {
	const { name } = program

	let newName = `${name} copy`
	const onConfirm = () => dispatch(duplicateProgramData(program, newName))
	return dispatch(safeOpenDialogModal(
		{
			titleKey        : 'ui.dialog.duplicate.title',
			confirmLabelKey : 'ui.dialog.duplicate.confirm',
			// limitWidth      : true,
			onConfirm
		},
		<FormInput
			defaultValue={newName}
			labelKey={'ui.dialog.duplicate.field'}
			onChange={e => newName = e}
		/>,
	))
}
export const modalUploadCode = (code) => async (dispatch) => {
	dispatch(compileCode(code))
	return dispatch(safeOpenModal(
		<UploadAreaContainer
			code={code}
		/>
	))
}
export const modalUploadBootloaderUpdater = () => async (dispatch) => {
	dispatch(retrieveBootloaderUpdater())
	dispatch(retrieveFactoryCode())
	return dispatch(safeOpenModal(
		<UploadAreaBootloaderUpdaterContainer/>
	))
}
export const modalImportProgram = () => async (dispatch) =>
	dispatch(safeOpenDialogModal(
		{
			titleKey       : 'ui.dialog.import.title',
			displayConfirm : false,
			displayCancel  : false
		},
		<ProgramImporterContainer />
	))
export const modalShareProgramData = (program) => async (dispatch, getState) => {
	const state = getState()

	const {
		id,
		name,
		type,
		source
	} = program

	const dynamicUrl = programDynamicUrlSelector()(state, { id, type })
	const staticUrl = programStaticUrlSelector()(state, { name, type, source })

	return dispatch(safeOpenModal(
		<ProgramMenuFrame
			name={name}
			type={type}
			centered={true}>
			<CopyableUrl
				titleKey='ui.dialog.share.dynamic_url.title'
				url={(dynamicUrl && staticUrl) ? dynamicUrl : staticUrl}
			/>
		</ProgramMenuFrame>
	))
}

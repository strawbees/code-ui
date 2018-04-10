import Router from 'next/router'
import {
	setFlowProgram,
	setScratchProgram,
	setTextProgram
} from 'src/actions/editor'
import {
	getProgram,
	removeProgram
} from 'src/utils/storage'
import editorSelector from 'src/selectors/editorSelector'
import makeStringSelector from 'src/selectors/makeStringSelector'
import resolveLinkUrl from 'src/utils/resolveLinkUrl'

export const removeProgramAndClearEditor = (id) => async (dispatch, getState) => {
	const state = getState()
	const { type } = await getProgram(id)
	await removeProgram(id)
	const editorData = editorSelector(state)[type]
	if (editorData.id === id) {
		const program = {
			id     : null,
			name   : null,
			source : null
		}
		if (type === 'flow') {
			dispatch(setFlowProgram(program))
		} else if (type === 'scratch') {
			dispatch(setScratchProgram(program))
		} else if (type === 'text') {
			dispatch(setTextProgram(program))
		}
	}
}

export const openProgramInEditorById = (id) => async (dispatch, getState) => {
	const state = getState()

	const rawProgram = await getProgram(id)
	const program = {
		id,
		type   : rawProgram.type,
		name   : rawProgram.name,
		source : rawProgram.source
	}
	const editorUrl = makeStringSelector(`${program.type}.url`)(state)
	const { href, as } = resolveLinkUrl(editorUrl)
	href.query.program = JSON.stringify(program)
	Router.push(href, as)
}

export const openProgramInEditor = (program) => async (dispatch, getState) => {
	const state = getState()
	const editorUrl = makeStringSelector(`${program.type}.url`)(state)
	const { href, as } = resolveLinkUrl(editorUrl)
	href.query.program = JSON.stringify(program)
	Router.push(href, as)
}

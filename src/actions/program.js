import Router from 'next/router'
import { getProgram } from 'src/utils/storage'
import makeStringSelector from 'src/selectors/makeStringSelector'
import resolveLinkUrl from 'src/utils/resolveLinkUrl'

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

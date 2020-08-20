import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'
import { HYDRATE, createWrapper } from 'next-redux-wrapper'
import reducer from 'src/reducers/index'

const hidratableReducer = (state, action) => {
	switch (action.type) {
		case HYDRATE:
			return { ...state, ...action.payload }
		default:
			return reducer(state, action)
	}
}

const composeEnhancers = (
	typeof window !== 'undefined' &&
	/* eslint-disable-next-line no-underscore-dangle */
	window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
) || compose

const initStore = () => {
	const middlewares = []
	middlewares.push(thunkMiddleware)
	if (process.browser && process.env.NODE_ENV !== 'production') {
		// eslint-disable-next-line global-require
		const { createLogger } = require('redux-logger')
		middlewares.push(createLogger({
			collapsed : true,
			diff      : true
		}))
	}

	const store = createStore(
		hidratableReducer,
		composeEnhancers(applyMiddleware(...middlewares))
	)

	if (module.hot) {
		module.hot.accept('./reducers/index', () => {
			/* eslint-disable global-require */
			store.replaceReducer(require('./reducers/index').default)
			/* eslint-enable global-require */
		})
	}
	return store
}

export const wrapper = createWrapper(initStore)

import { configureStore } from '@reduxjs/toolkit'
import user from './store/userSlice.js'
import cart from './store/cartSlice.js'

export default configureStore({
	reducer: {
		user : user.reducer,
		cart : cart.reducer,
	}
})
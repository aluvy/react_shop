import { createSlice } from '@reduxjs/toolkit'

let cart = createSlice({
	name : 'cart',
	initialState :
		[
			{id : 0, name : 'White and Black', count : 2},
			{id : 2, name : 'Grey Yordan', count : 1}
		],
	reducers : {
		addCount( state, action ){
			let idx = state.findIndex( a => a.id === action.payload.id )
			state[idx].count++;
		},
		removeCount( state, action ){
			let idx = state.findIndex( a => a.id === action.payload.id )
			if( state[idx].count <= 1 ){
				let status = window.confirm("해당 상품을 삭제 하시겠습니까?");
				if( !status ){ return }
				state.splice(idx, 1);
			} else {
				state[idx].count--;
			}
		},
		addItem( state, action ){
			let idx = state.findIndex( a => a.id === action.payload.id )
			if( idx === -1 ){			
				state.push(action.payload)
			} else {
				state[idx].count++;
			}
		}
	}
})

export let { addCount, addItem, removeCount } = cart.actions;
export default cart;
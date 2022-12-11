import { Container, Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { changeName, changeAge } from './../store/userSlice.js';
import { addCount, removeCount } from './../store/cartSlice.js';


function Cart(){
	
	let { cart, user } = useSelector((state)=>{ return state });
	let dispatch = useDispatch();

	return (
		<article id="Cart">
			<Container>
				<h6>{ user.name } { user.age }의 장바구니</h6>
				
				<Button size="sm" onClick={()=>{
					dispatch(changeName())
				}}>이름변경</Button>
				<Button size="sm" onClick={()=>{
					dispatch(changeAge(100))
				}}>나이변경</Button>

				<Table>
					<thead>
						<tr>
							<th width="50">#</th>
							<th>상품명</th>
							<th>수량</th>
							<th width="80">변경하기</th>
						</tr>
					</thead>
					<tbody>
						{
							cart.map((item, i)=>{
								return (
									<tr key={i}>
										<td>{ item.id }</td>
										<td>{ item.name }</td>
										<td>{ item.count }</td>
										<td>
											<Button variant="outline-primary" size="sm" onClick={()=>{
												dispatch(addCount( item ))
											}}>+</Button>
											<Button variant="outline-danger" size="sm" onClick={()=>{
												dispatch(removeCount( item ))
											}}>-</Button>
										</td>
									</tr>
								)
							})
						}
					</tbody>
				</Table>
			</Container>
		</article>
	)
}

export default Cart;
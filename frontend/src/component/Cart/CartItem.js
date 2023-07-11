import React from 'react';
import {Link } from "react-router-dom";
import {  useDispatch } from "react-redux";
import {addToCartItems , removeFromCartItems} from "../../actions/cartAction"

const CartItem = ({item}) => {
   const dispatch = useDispatch();
   const increaseQuantityHandler = (product_id , stock ,quantity) => {
    if (quantity >= stock) return;
    dispatch(addToCartItems(product_id , quantity+1));
   }

   const decreaseQuantityHandler = (product_id , stock ,quantity) => {
    if (quantity <= 1) return;
    dispatch(addToCartItems(product_id , quantity-1));
   }

   const removeItemHandler = (product_id) => {
    dispatch(removeFromCartItems(product_id));
   }

  return (
    <div>
        <div className='p-2 border-b-2 border-b-gray-900 flex mb-2 justify-between items-center'>
            <div className='flex gap-x-2 items-center'>
                <div className='w-[25vw] md:w-[15vw] '>
                    <img className=' aspect-[5/4] object-fill rounded-lg' src={item.image.url} alt={item.name} loading='lazy'/>
                </div>
                <div className='flex flex-col gap-y-1 md:gap-y-2 md:ml-2'>
                    <Link to={`/product/${item.product_id}`}>{item.name}</Link>
                    <div className='italic text-[0.75rem]'>{item.product_id}</div>
                    <div><span className='font-semibold'>Price : </span>{item.price}</div>
                    <button
                    onClick={() => {removeItemHandler(item.product_id)}}
                    className='text-red-700 font-semibold text-xs border-red-500 border w-fit px-1 rounded-md '>Remove</button>
                </div>
            </div>
            <div className='flex flex-col items-center gap-y-4 mr-2'>
                <div className='flex rounded-lg px-1 items-center'>
                    <button
                    onClick={() => decreaseQuantityHandler(item.product_id,item.stock,item.quantity)}
                    className='px-2 text-xl'>-</button>
                    <div className='px-2 border-l border-r border-black'>{item.quantity}</div>
                    <button
                    onClick={() => increaseQuantityHandler(item.product_id,item.stock,item.quantity)}
                    className='px-2 text-xl'>+</button>
                </div>
                <div className='text-xl'>
                    ₹ {item.price *item.quantity}
                </div>
            </div>
        </div>
    </div>
  )
}

export default CartItem
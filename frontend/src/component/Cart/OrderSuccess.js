import React from 'react'
import {BiSolidCheckCircle} from "react-icons/bi";
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
  return (
    <div className='w-screen min-h-screen pt-[8rem] overflow-y-hidden bg-[#ddd]'>
        <div className='w-[80vw] max-w-[600px] mx-auto h-[60vh] max-h-[600px] flex flex-col justify-evenly bg-baby-powder mt-8 rounded-lg shadow-xl p-4 items-center'>
            <div><BiSolidCheckCircle className='text-6xl text-midnight-green'/></div>
            <div className='flex flex-col items-center'>
                <h2 className='text-2xl  mb-2'>Congrats</h2>
                <p className='text-base font-semibold text-[#333]'>Your Order Placed Successfully</p>
            </div>
            <Link to = "/orders">
            <button className='relative bg-midnight-green text-white px-6 py-2 rounded-sm tracking-wider
            hover:bg-gradient-to-r hover:from-[#037971ff] transition-colors duration-500 ease-in-out hover:to-midnight-green'>
            View Orders
            </button></Link>
        </div>

    </div>
    
  )
}

export default OrderSuccess
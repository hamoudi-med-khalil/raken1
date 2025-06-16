import React from 'react'
import {RiDeleteBin3Line} from 'react-icons/ri'
import { useDispatch } from 'react-redux'
import { removeFromCart, updateCartItemQuantity } from '../../redux/slices/cartSlice'

const CartContent = ({cart, userId, guestId}) => {

    // const cartProduct = [
    //     {
    //         productId: 1,
    //         name: "T-Shirt",
    //         size: "M",
    //         color: "Red",
    //         quantity: 1,
    //         price: 15,
    //         image: "https://picsum.photos/200?random=1",
    //     },
    //     {
    //         productId: 2,
    //         name: "Jeans",
    //         size: "L",
    //         color: "Blue",
    //         quantity: 1,
    //         price: 25,
    //         image: "https://picsum.photos/200?random=2",
    //     },
    //     {
    //         productId: 3,
    //         name: "Jeans",
    //         size: "L",
    //         color: "Blue",
    //         quantity: 1,
    //         price: 25,
    //         image: "https://picsum.photos/200?random=3",
    //     },
    //     {
    //         productId: 4,
    //         name: "Jeans",
    //         size: "L",
    //         color: "Blue",
    //         quantity: 1,
    //         price: 25,
    //         image: "https://picsum.photos/200?random=4",
    //     },
    //     {
    //         productId: 5,
    //         name: "Jeans",
    //         size: "L",
    //         color: "Blue",
    //         quantity: 1,
    //         price: 25,
    //         image: "https://picsum.photos/200?random=5",
    //     }
    // ]
    const dispatch = useDispatch()
    const handleAddTocart = (productId, delta, quantity, size, color) =>{
        const newQuantity = quantity + delta
        if(newQuantity >= 1){
            dispatch(updateCartItemQuantity({
                productId,
                quantity : newQuantity,
                guestId,
                userId,
                size,
                color,
            }))
        }
    }
    const handleRemoveFromCart = (productId ,size, color, guestId) =>{
        dispatch(removeFromCart({productId, guestId, userId, size, color}))
    }

    return (
        <div>
            {cart.products.map((product, index) => (
                <div key={index} className='flex items-start justify-between border-b py-4'>
                    <div className='flex items-start'>
                        <img
                            src={product.image}
                            alt={product.name}
                            className='w-20 h-24 object-cover rounded mr-4'
                        />
                        <div>
                            <h3>{product.name}</h3>
                            <p className='text-gray-500 text-sm' >
                                size : {product.size} | color: {product.color}
                            </p>
                            <div className='flex items-center mt-2'>
                                <button onClick={()=> handleAddTocart(product.productId, 1, product.quantity, product.size, product.color)}  
                                className='border rounded text-sm font-medium py-1 px-2  '>+</button>
                                <span className='mx-2'>{product.quantity}</span>
                                <button onClick={()=> handleAddTocart(product.productId, -1, product.quantity, product.size, product.color)}
                                className='border rounded text-sm font-medium py-1 px-2 '>-</button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p>${product.price.toLocaleString()}</p>
                        <button onClick={()=> handleRemoveFromCart(product.productId,product.size, product.color, product.guestId)}>
                            <RiDeleteBin3Line className='h-6 w-6 mt-2 text-gray-500' />
                        </button>
                    </div>
                </div>
            )
            )}
        </div>
    )
}

export default CartContent
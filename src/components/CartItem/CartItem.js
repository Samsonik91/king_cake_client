import React, {useState} from 'react'
import {useDispatch} from "react-redux"
import {SETCARTCOUNT} from "../../store/actionTypes"
import CartItemBigScreen from "./CartItemBigScreen"
import CartItemSmallScreen from "./CartItemSmallScreen"

const CartItem = ({item, storage, setStorage, deleteCartItem}) => {
    const dispatch = useDispatch()

    const [quantity, setQuantity] = useState(item.quantity)

    const cart = JSON.parse(localStorage.getItem('cart'))
    const isProd = (process.env.NODE_ENV === 'production')
    const URL = isProd ? "https://king-cake.herokuapp.com/" : "http://localhost:5000/"

    const changeQuantity = (value) => {
        let currentCount = quantity + value
        if(currentCount < 1) currentCount = 1
        if(currentCount > 9) currentCount = 9
        setQuantity(currentCount)
        for(let i=0; i<cart.length; i++){
            if(cart[i].priceId === item.priceId){
                cart[i].quantity = currentCount
            }
        }
        const cartCount = cart.reduce((sum, item)=> sum += item.quantity ,0)
        dispatch({type: SETCARTCOUNT, payload: cartCount})
        localStorage.setItem('cartCount', JSON.stringify(cartCount))
        localStorage.setItem('cart', JSON.stringify(cart))
        setStorage(!storage)
    }

    return (
        <>
            <div className='d-none d-md-block'>
                <CartItemBigScreen
                    item={item}
                    quantity={quantity}
                    changeQuantity={changeQuantity}
                    deleteCartItem={deleteCartItem}
                    URL={URL}
                />
            </div>
            <div className='d-block d-md-none'>
                <CartItemSmallScreen
                    item={item}
                    quantity={quantity}
                    changeQuantity={changeQuantity}
                    deleteCartItem={deleteCartItem}
                    URL={URL}
                />
            </div>
        </>
    )
}

export default CartItem
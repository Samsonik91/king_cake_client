import React, {useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom"
import {Button, Container} from "react-bootstrap"
import {useDispatch, useSelector} from "react-redux"
import CartItem from "../components/CartItem/CartItem"
import emptyCart from '../images/empty_cart.png'
import {SETCARTCOUNT} from "../store/actionTypes"
import ConfirmOrder from "../components/modals/ConfirmOrder"

const Cart = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [total, setTotal] = useState(0)
    const [storage, setStorage] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)

    const {isFetching} = useSelector(({cart})=> cart)

    let cart = JSON.parse(localStorage.getItem('cart'))

    const token = localStorage.getItem('token')

    const totalSum = () => {
        setTotal(cart.reduce((sum, item)=> sum += item.value * item.quantity ,0))
    }

    const deleteCartItem = (id) => {
        cart = cart.filter(c=> c.priceId !== id)
        const cartCount = cart.reduce((sum, item)=> sum += item.quantity ,0)
        dispatch({type: SETCARTCOUNT, payload: cartCount})
        localStorage.setItem('cart', JSON.stringify(cart))
        localStorage.setItem('cartCount', JSON.stringify(cartCount))
        setStorage(!storage)
    }

    useEffect(()=>{
        if(!token) navigate('/auth')
    },[token])

    useEffect(()=>{
        if(cart) totalSum()
    },[storage])


    if(token && cart.length === 0) return(
        <Container className='mt-5 p-3 border rounded-2 border-1 border-secondary
         d-flex flex-column align-items-center w-25'>
            <h5>Корзина пуста</h5>
            <img src={emptyCart}/>
            <Button
                onClick={()=>navigate(-1)}
                className='mt-3'
            >
                Вернуться назад
            </Button>
        </Container>
    )

    return (
        <>
            {showConfirm &&
                <ConfirmOrder
                    showConfirm={showConfirm}
                    setShowConfirm={setShowConfirm}
                    total={total}
                />
            }
            <Container className='mt-4 mb-4'>
                {token && cart.length > 0 && cart.map(i=>
                        <CartItem
                            key={i.priceId}
                            item={i}
                            storage={storage}
                            setStorage={setStorage}
                            deleteCartItem={deleteCartItem}
                        />
                )}
                <div className='d-none d-md-flex mt-4 justify-content-between align-items-center'>
                    <div className='d-flex justify-content-start'>
                        <h4 className='text-secondary'>Сумма заказа:</h4>
                        <h4 className='ms-2'>{total}</h4>
                        <h6 className='ms-1 pt-2'>грн.</h6>
                    </div>
                    <div>
                        <Button
                            size='lg'
                            disabled={isFetching}
                            onClick={()=>setShowConfirm(true)}
                        >
                            Оформить заказ
                        </Button>
                    </div>
                </div>
                <div className='d-flex d-md-none flex-column align-items-center'>
                    <div className='d-flex justify-content-end w-100 me-3 me-md-0'>
                        <div className='d-flex'>
                            <h5 className='text-secondary'>Сумма заказа:</h5>
                        </div>
                        <div className='d-flex'>
                            <h5 className='ms-2'>{total}</h5>
                            <small className='ms-1' style={{paddingTop: '0.25rem'}}>грн.</small>
                        </div>
                    </div>
                    <div className='d-flex mt-3'>
                        <Button
                            disabled={isFetching}
                            onClick={()=>setShowConfirm(true)}
                        >
                            Оформить заказ
                        </Button>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default Cart
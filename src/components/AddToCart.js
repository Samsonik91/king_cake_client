import React,{useState, useEffect} from 'react'
import {useDispatch} from "react-redux"
import {useNavigate} from "react-router-dom"
import {Button, Dropdown, DropdownButton} from "react-bootstrap"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faMinusSquare, faPlusSquare} from "@fortawesome/free-regular-svg-icons"
import {faCartPlus} from "@fortawesome/free-solid-svg-icons"
import {SETCARTCOUNT} from "../store/actionTypes"
import Swal from "sweetalert2"

const AddToCart = ({price, ownPage, cake}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [selectedPrice, setSelectedPrice] = useState(null)
    const [quantity, setQuantity] = useState(1)

    const cart = JSON.parse(localStorage.getItem('cart'))

    const changePrice = (p) => {
        setSelectedPrice(p)
    }

    const changeCount = (value) => {
        let currentQuantity = quantity + value
        if(currentQuantity < 1) currentQuantity = 1
        if(currentQuantity > 9) currentQuantity = 9
        setQuantity(currentQuantity)
    }

    const addItemToCart = () => {
        const token = localStorage.getItem('token')

        if(!token) return Swal.fire({
            title: 'Войти',
            text: 'Создавать заказ могут только авторизованные пользователи',
            icon: 'question',
            showCancelButton: true,
            cancelButtonText: 'Отмена',
            confirmButtonText: 'Войти'
        }).then((result)=>{
            if(result.isConfirmed){
                navigate('/auth')
            }else{
                return true
            }
        })

        const priceId = selectedPrice.id
        let existing = false

        for(let i=0; i<cart.length; i++){
            const cartItem = cart[i]
            if(cartItem.priceId === priceId) {
                cartItem.quantity = cartItem.quantity + quantity
                existing = true
            }
        }

        if(!existing) {
            const value = selectedPrice.value
            const weight = selectedPrice.weight
            const item = {cakeId: cake.id, img: cake.img, name: cake.name, priceId, quantity, weight, value}
            cart.push(item)
        }

        const cartCount = cart.reduce((sum, item)=> sum += item.quantity ,0)
        dispatch({type: SETCARTCOUNT, payload: cartCount})
        localStorage.setItem('cartCount', JSON.stringify(cartCount))
        localStorage.setItem('cart', JSON.stringify(cart))

        Swal.fire({
            title: 'Перейти в корзину или продолжить покупки?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'В корзину',
            cancelButtonText: `Продолжить покупки`,
        }).then((result) => {
            if (result.isConfirmed) {
                navigate('/cart')
            } else {
                return true
            }
        })
    }

    useEffect(()=>{
        if(price) setSelectedPrice(price[0])
    },[price])

    return (
        <>
            <div
                className='d-flex justify-content-between align-items-end mb-3'
            >
                <DropdownButton
                    id="dropdown-basic-button"
                    title={ownPage && !selectedPrice ? 'Выбрать вес торта' : `${(selectedPrice?.weight/1000).toFixed(1)} кг`}
                >
                    {price && price.map((p,i)=>(
                        <Dropdown.Item
                            key={Math.random()+i}
                            onClick={()=>changePrice(p)}
                        >
                            {`${(p.weight/1000).toFixed(1)} кг`}
                        </Dropdown.Item>
                    ))}
                </DropdownButton>
                <div>
                    {selectedPrice &&
                        <div className='d-flex align-items-center'>
                            <h4 className='me-1'>{selectedPrice.value}</h4>
                            <span>грн.</span>
                        </div>
                    }
                </div>
            </div>
            <div
                className='border-bottom border-secondary w-100 border-1 mb-3'
                style={{height: '0px'}}
            ></div>
            <div className='d-flex justify-content-between align-items-center'>
                {ownPage && <h6>Количество:</h6>}
                <div>
                    <FontAwesomeIcon
                        icon={faMinusSquare}
                        size='xl'
                        role='button'
                        className='me-2'
                        onClick={()=>changeCount(-1)}
                    />
                    <h5 className='me-1 d-inline-block'>{quantity}</h5>
                    <span className='me-2'>шт.</span>
                    <FontAwesomeIcon
                        icon={faPlusSquare}
                        size='xl'
                        role='button'
                        onClick={()=>changeCount(1)}
                    />
                </div>
                <Button
                    variant="primary"
                    title='Добавить в корзину'
                    size='sm'
                    className='mb-1'
                    onClick={addItemToCart}
                >
                    <FontAwesomeIcon
                        icon={faCartPlus}
                        size='lg'
                    />
                </Button>
            </div>
        </>
    )
}

export default AddToCart
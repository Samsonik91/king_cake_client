import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"
import decode from 'jwt-decode'
import {Button, Form, FormControl, FormGroup, FormLabel, Modal} from "react-bootstrap"
import {fetchOrder} from "../../api/cartApi"
import {SETCARTCOUNT, SETISFETCHING} from "../../store/actionTypes"
import Swal from "sweetalert2"

const ConfirmOrder = ({showConfirm, setShowConfirm}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const token = JSON.parse(localStorage.getItem('token'))

    const [phone, setPhone] = useState('')
    const [name, setName] = useState('')

    const {isFetching} = useSelector(({cart})=> cart)

    const confirmOrder = async() => {
        dispatch({type: SETISFETCHING, payload: true})

        const cart = JSON.parse(localStorage.getItem('cart'))
        const items = []
        for(let i=0; i<cart.length; i++){
            const item = {
                quantity: cart[i].quantity,
                cakeId: cart[i].cakeId,
                priceId: cart[i].priceId
            }
            items.push(item)
        }
        const {data, status} = await fetchOrder({items, name, phone})
        console.log(data, status)
        if(status === 201){
            setPhone('')
            setName('')
            setShowConfirm(false)
            localStorage.setItem('cart', JSON.stringify([]))
            localStorage.removeItem('cartCount')
            dispatch({type: SETCARTCOUNT, payload: 0})

            Swal.fire({
                text: data.message,
                icon: 'success',
                timer: 4000
            })
            navigate('/')
        }else{
            Swal.fire({
                title: 'Ошибка',
                text: data.message,
                icon: 'error',
                timer: 4000
            })
        }

        dispatch({type: SETISFETCHING, payload: false})
        setShowConfirm(false)
    }

    useEffect(()=>{
        const decodedToken = decode(token)
        setName(decodedToken.name)
        setPhone(decodedToken.phone)
    },[])

    return (
        <Modal
            show={showConfirm}
            onHide={()=>setShowConfirm(false)}
        >
            <Modal.Header closeButton>
                <Modal.Title className='text-secondary'>Подтверждение заказа</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <FormGroup className='mb-4'>
                        <FormLabel className='fs-5 fw-semibold'>Ваше имя</FormLabel>
                        <FormControl
                            type='text'
                            autoFocus
                            value={name}
                            placeholder='Как к вам обращаться'
                            onChange={(e)=>setName(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel className='fs-5 fw-semibold'>Ваш номер телефона</FormLabel>
                        <FormControl
                            type='text'
                            autoFocus
                            value={phone}
                            placeholder='Напишите ваш номер, чтобы мы смогли с вами связаться'
                            onChange={(e)=>setPhone(e.target.value)}
                        />
                    </FormGroup>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="secondary"
                    disabled={isFetching}
                    onClick={()=>setShowConfirm(false)}
                >
                    Отмена
                </Button>
                <Button
                    variant="primary"
                    disabled={isFetching}
                    onClick={confirmOrder}
                >
                    Подтвердить заказ
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ConfirmOrder
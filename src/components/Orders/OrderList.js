import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"
import styles from './orderList.module.scss'
import {Button} from "react-bootstrap"
import {getAllOrders} from "../../thunks/cart"
import OrderItem from "./OrderItem"


const OrderList = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {orders} = useSelector(({cart})=> cart)

    const token = localStorage.getItem('token')

    useEffect(()=>{
        if(!token) navigate('/auth')
        dispatch(getAllOrders())
    },[token])

    return (
        <div className={`m-auto ${styles.container}`}>
            <div className='d-flex flex-column p-3 pb-md-3 p-md-4 m-3 m-md-4
             gap-3 gap-md-4 border border-1 border-secondary rounded-2'>
                <div className='d-flex flex-column justify-content-between'>
                    <h4 className='text-sm-start'>Заказы клиентов</h4>
                    <div className='border-top border-1 border-secondary'></div>
                </div>
                    {orders.length>0 && orders.map(o=>
                        <OrderItem key={o.id} item={o}/>
                    )}
                <div className='d-flex justify-content-center'>
                    <Button variant="primary" onClick={()=> navigate(-1)}>
                        Вернуться назад
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default OrderList

/*
<Modal show={show} onHide={handleClose} className='w-100'>
            <Modal.Header closeButton>
                <Modal.Title>Заказы клиентов</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {orders.length>0 && orders.map(o=>
                    <OrderItem key={o.id} item={o}/>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Выйти
                </Button>
            </Modal.Footer>
        </Modal>
 */
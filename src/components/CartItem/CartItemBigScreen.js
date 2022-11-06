import React from 'react'
import {Col, Row, Spinner} from "react-bootstrap"
import {Link} from "react-router-dom"
import styles from "./cartItem.module.scss"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faCircleXmark, faMinusSquare, faPlusSquare} from "@fortawesome/free-regular-svg-icons"

const CartItemBigScreen = ({item, quantity, changeQuantity, deleteCartItem, URL}) => {
    return (
        <Row className='border rounded-2 border-secondary mb-3 p-2'>
            <Col md={2} lg={1}>
                {item.img ?
                    <Link to={`/${item.cakeId}`}>
                        <img
                            src={URL + item.img}
                            className={styles.image}
                        />
                    </Link>
                    :
                    <div
                        className={`${styles.spinner} d-flex justify-content-center align-items-center`}
                    >
                        <Spinner animation="border" variant="primary" />
                    </div> }
            </Col>
            <Col md={3} lg={4} className='d-flex justify-content-center align-items-center text-secondary'>
                <Link to={`/${item.cakeId}`} className='text-decoration-none'>
                    <h5>{item.name}</h5>
                </Link>
            </Col>
            <Col md={1} className='d-flex flex-column justify-content-between align-items-center'>
                <h5 className='text-secondary'>Вес</h5>
                <div className='d-flex justify-content-center align-items-center'>
                    <h5 className='fw-bold me-1 ps-2'>{(item.weight/1000).toFixed(1)}</h5>
                    <small className='pb-1'>кг.</small>
                </div>
            </Col>
            <Col md={3} className='d-flex flex-column justify-content-between align-items-center'>
                <h5 className='text-secondary'>Количество</h5>
                <div className='d-flex justify-content-between'>
                    <FontAwesomeIcon
                        icon={faMinusSquare}
                        size='xl'
                        role='button'
                        className='me-2'
                        onClick={()=>changeQuantity(-1)}
                    />
                    <h5 className='me-1 d-inline-block fw-bold'>{quantity}</h5>
                    <small className='me-2' style={{paddingTop: '0.22rem'}}>шт.</small>
                    <FontAwesomeIcon
                        icon={faPlusSquare}
                        size='xl'
                        role='button'
                        onClick={()=>changeQuantity(1)}
                    />
                </div>
            </Col>
            <Col md={2} className='d-flex flex-column justify-content-between align-items-center'>
                <h5 className='text-secondary'>Сумма</h5>
                <div className='d-flex justify-content-center align-items-center'>
                    <h5 className='fw-bold me-1'>{quantity * item.value}</h5>
                    <small className='pb-1'>грн.</small>
                </div>
            </Col>
            <Col md={1} className='d-flex justify-content-center align-items-center'>
                <FontAwesomeIcon
                    icon={faCircleXmark}
                    role='button'
                    size='2xl'
                    color='grey'
                    title='Убрать из корзины'
                    className={styles.delete}
                    onClick={()=> deleteCartItem(item.priceId)}
                ></FontAwesomeIcon>
            </Col>
        </Row>
    )
}

export default CartItemBigScreen
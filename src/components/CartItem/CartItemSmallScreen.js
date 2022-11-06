import React from 'react'
import {Link} from "react-router-dom"
import styles from "./cartItem.module.scss"
import {Spinner} from "react-bootstrap"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faCircleXmark, faMinusSquare, faPlusSquare} from "@fortawesome/free-regular-svg-icons"

const CartItemSmallScreen = ({item, quantity, changeQuantity, deleteCartItem, URL}) => {
    return (
        <div className='d-flex flex-column justify-content-between
         align-items-center position-relative border border-1 border-secondary rounded-2 m-2 mb-3'>
            <div className='d-flex justify-content-center align-items-center'>
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
            </div>
            <div className='d-flex justify-content-center mt-2'>
                <Link to={`/${item.cakeId}`} className='text-decoration-none'>
                    <h5>{item.name}</h5>
                </Link>
            </div>
            <div className='d-flex justify-content-between mt-2 w-100 ps-2 pe-2'>
                <div className='d-flex flex-column justify-content-between align-items-center'>
                    <h5 className='text-secondary'>Вес</h5>
                    <div className='d-flex justify-content-center align-items-center'>
                        <h5 className='fw-bold me-1 ps-2'>{(item.weight/1000).toFixed(1)}</h5>
                        <small className='pb-1'>кг.</small>
                    </div>
                </div>
                <div className='d-flex flex-column justify-content-between align-items-center'>
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
                </div>
                <div className='d-flex flex-column justify-content-between align-items-center'>
                    <h5 className='text-secondary'>Сумма</h5>
                    <div className='d-flex justify-content-center align-items-center'>
                        <h5 className='fw-bold me-1'>{quantity * item.value}</h5>
                        <small className='pb-1'>грн.</small>
                    </div>
                </div>
                <div className={`position-absolute ${styles.blockDelete}`}>
                    <FontAwesomeIcon
                        icon={faCircleXmark}
                        role='button'
                        size='2xl'
                        color='grey'
                        title='Убрать из корзины'
                        className={styles.delete}
                        onClick={()=> deleteCartItem(item.priceId)}
                    ></FontAwesomeIcon>
                </div>
            </div>
        </div>
    )
}

export default CartItemSmallScreen
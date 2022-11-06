import React, {useEffect, useState} from 'react'
import {useSelector} from "react-redux"
import {Link} from "react-router-dom"
import styles from './orderItemBigScreen.module.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faChevronDown, faChevronUp} from "@fortawesome/free-solid-svg-icons"
import {Button, Col, Row} from "react-bootstrap"

const OrderItemBigScreen = ({item, showDetails, setShowDetails, URL, deleteOneOrder}) => {

    const [totalSum, setTotalSum] = useState(0)

    const {isFetching} = useSelector(({cart})=> cart)

    const cakes = item.cakes

    useEffect(()=>{
        setTotalSum(cakes.reduce((total, cake)=> total += cake.summary, 0))
    },[])

    return (
        <div className='d-flex flex-column justify-content-between border border-1
         border-secondary rounded-2 border border-1 border-secondary rounded-2 p-3'>
            <div className='d-flex flex-column align-items-center gap-2 w-100'>
                <Row className='d-flex justify-space-between align-items-start w-100'>
                    <Col md={1} className='d-flex flex-column align-items-center'>
                        <h6 className='text-center'>№</h6>
                        <div className='me-1'>{item.id}</div>
                    </Col>
                    <Col md={4} className='d-flex flex-column align-items-center'>
                        <h6 className='text-center'>Заказчик</h6>
                        <div className='text-center'>
                            {item.name.length > 20 ? item.name.split('').slice(0,20) : item.name}
                        </div>
                    </Col>
                    <Col md={4} className='d-flex flex-column align-items-center'>
                        <h6 className='text-center'>Телефон</h6>
                        <div className='text-center'>{item.phone}</div>
                    </Col>
                    <Col md={3} className='d-flex flex-column align-items-center'>
                        <h6 className='text-center'>Создан</h6>
                        <div className='text-center'>{item.date}</div>
                    </Col>
                </Row>
                <div className={`d-flex justify-content-center text-primary mt-3 mb-3 ${styles.details}`} role='button'>
                    {!showDetails ?
                        <>
                            <h6 onClick={()=>setShowDetails(true)}>Подробнее</h6>
                            <FontAwesomeIcon
                                icon={faChevronDown}
                                className={`ms-2 ${styles.iconDown}`}
                                onClick={()=>setShowDetails(true)}
                            />
                        </>
                        :
                        <>
                            <h6 onClick={()=> setShowDetails(false)}>Скрыть подробности</h6>
                            <FontAwesomeIcon
                                icon={faChevronUp}
                                className={`ms-2 ${styles.iconUp}`}
                                onClick={()=> setShowDetails(false)}
                            />
                        </>}
                </div>
            </div>
            {showDetails &&
                <>
                    {cakes.length>0 && cakes.map(c=>
                            <div
                                className='d-flex justify-content-start
                                border border-secondary border-1 rounded-2 mb-4'
                                key={c.orderCakeId}
                            >
                                <div className={`p-2 ${styles.img}`}>
                                    <Link to='#'>
                                        <img
                                            className='w-100 h-100'
                                            style={{objectFit: 'cover'}}
                                            src={URL + c.img}
                                        />
                                    </Link>
                                </div>
                                <Link
                                    to='#'
                                    className={`d-flex justify-content-center align-items-center
                                     text-decoration-none ${styles.cakeName}`}
                                >
                                        <strong>{c.name}</strong>
                                </Link>
                                <div className={`d-flex flex-column justify-content-between
                                 align-items-center bg-secondary bg-opacity-10 p-1 ${styles.feature}`}>
                                    <h6>Вес</h6>
                                    <div>
                                        <strong className='me-1'>{c.weight}</strong>
                                        <small>кг.</small>
                                    </div>
                                </div>
                                <div className={`d-flex flex-column justify-content-between
                                 align-items-center bg-secondary bg-opacity-75 p-1 ${styles.feature}`}>
                                    <h6>Цена</h6>
                                    <div>
                                        <strong className='me-1'>{c.value}</strong>
                                        <small>грн.</small>
                                    </div>
                                </div>
                                <div className={`d-flex flex-column justify-content-between
                                 align-items-center bg-secondary bg-opacity-10 p-1 ${styles.feature}`}>
                                    <h6>Кол.</h6>
                                    <div>
                                        <strong className='me-1'>{c.quantity}</strong>
                                        <small>шт.</small>
                                    </div>
                                </div>
                                <div className={`d-flex flex-column justify-content-between
                                 align-items-center bg-secondary bg-opacity-50 p-1 ${styles.feature}`}>
                                    <h6>В сумме</h6>
                                    <div>
                                        <strong className='me-1'>{c.quantity * c.value}</strong>
                                        <small>грн.</small>
                                    </div>
                                </div>
                        </div>
                    )
                    }
                    <div className='d-flex justify-content-end mb-3'>
                        <div>Итого:</div>
                        <strong className='ms-1'>{totalSum}</strong>
                        <small className='ms-1' style={{paddingTop: '0.1rem'}}>грн.</small>
                    </div>
                    <div className='d-flex justify-content-end'>
                        <Button
                            variant='danger'
                            disabled={isFetching ? true : false}
                            onClick={deleteOneOrder}
                        >Удалить заказ</Button>
                    </div>
                </>
            }
        </div>
    )
}

export default OrderItemBigScreen
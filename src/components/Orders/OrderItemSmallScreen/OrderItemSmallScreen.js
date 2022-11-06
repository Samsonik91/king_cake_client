import React, {useEffect, useState} from 'react'
import styles from "./orderItemSmallScreen.module.scss"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {
    faChevronCircleUp,
    faChevronDown,
    faChevronUp,
    faCircleChevronDown,
    faCircleChevronUp
} from "@fortawesome/free-solid-svg-icons"
import {Button} from "react-bootstrap"
import {getOrderCakes} from "../../../thunks/cart"
import {useDispatch, useSelector} from "react-redux"
import {Link} from "react-router-dom"

const OrderItemSmallScreen = ({item, showDetails, setShowDetails, URL, deleteOneOrder}) => {

    const [totalSum, setTotalSum] = useState(0)

    const {isFetching} = useSelector(({cart})=> cart)

    const cakes = item.cakes

    useEffect(()=>{
        setTotalSum(cakes.reduce((total, cake)=> total += cake.summary, 0))
    },[])

    return (
        <div className='d-flex flex-column justify-content-between gap-3 border border-1
         border-secondary rounded-2 border border-1 border-secondary rounded-2 p-3'>
            <div className='d-flex flex-column gap-1'>
                <div className='d-flex justify-space-between align-items-start'>
                    <div className={`d-flex flex-column align-items-center ${styles.number}`}>
                        <h6 className='text-center'>№</h6>
                        <div className='text-center'>{item.id}</div>
                    </div>
                    <div className={`d-flex flex-column align-items-center ${styles.name}`}>
                        <h6 className='text-center'>Заказчик</h6>
                        <div className='text-center d-block d-sm-none'>
                            {item.name.length > 15 ? item.name.split('').slice(0,15) : item.name}
                        </div>
                        <div className='text-center d-none d-sm-block'>
                            {item.name.length > 25 ? item.name.split('').slice(0,25) : item.name}
                        </div>
                    </div>
                    <div className={`d-flex flex-column align-items-center ${styles.date}`}>
                        <h6 className='text-center'>Создан</h6>
                        <div className='text-center'>{item.date}</div>
                    </div>
                </div>
            </div>
            {!showDetails ?
                <Button
                    className='w-100'
                    size='sm'
                    onClick={()=> setShowDetails(true)}
                >
                    Подробнее
                    <FontAwesomeIcon
                        icon={faCircleChevronDown}
                        className='ms-1'
                        onClick={()=>setShowDetails(true)}
                    />
                </Button>
                    :
                <Button
                    className='w-100'
                    variant='info'
                    size='sm'
                    onClick={()=> setShowDetails(false)}
                >
                    Скрыть подробности
                    <FontAwesomeIcon
                        icon={faChevronUp}
                        className={`ms-2 fs-6 ${styles.iconMini}`}
                    />
                </Button>
            }
            {showDetails &&
                <>
                    {cakes.length>0 && cakes.map(c=>
                        <div className='d-flex flex-column justify-content-between mt-3'>
                            <div
                                className='d-flex justify-content-between'
                                key={c.orderCakeId}
                            >
                                <Link to='#' className='w-25'>
                                    <img
                                        className={`w-100 h-100 ${styles.img}`}
                                        src={URL + c.img}
                                    />
                                </Link>
                                <div className='d-flex flex-column justify-content-center align-items-center w-75'>
                                    <Link to='#' className='text-decoration-none'>
                                        <h5>{c.name}</h5>
                                    </Link>
                                </div>
                            </div>
                            <div className='d-flex justify-content-between mt-3'>
                                <div className='d-flex flex-column align-items-center bg-secondary bg-opacity-10 w-25'>
                                    <h6>Вес</h6>
                                    <div className='d-flex align-items-center'>
                                        <strong>{c.weight}</strong>
                                        <small className='ms-1'>кг.</small>
                                    </div>
                                </div>
                                    <div className='d-flex flex-column align-items-center bg-secondary bg-opacity-75 w-25'>
                                        <h6>Цена</h6>
                                        <div className='d-flex align-items-center'>
                                            <strong>{c.value}</strong>
                                            <small className='ms-1'>грн.</small>
                                        </div>
                                    </div>
                                    <div className='d-flex flex-column align-items-center bg-secondary bg-opacity-10 w-25'>
                                        <h6>Кол.</h6>
                                        <div className='d-flex align-items-center'>
                                            <strong>{c.quantity}</strong>
                                            <small className='ms-1'>шт.</small>
                                        </div>
                                    </div>
                                    <div className='d-flex flex-column align-items-center bg-secondary bg-opacity-25 w-25'>
                                        <h6>В сумме</h6>
                                        <div className='d-flex align-items-center'>
                                            <strong>{c.summary}</strong>
                                            <small className='ms-1'>грн.</small>
                                        </div>
                                    </div>
                                <div className='d-flex flex-column'>

                                </div>
                            </div>
                            <div className='d-block border-top border-1 border-secondary'></div>
                        </div>
                        )
                    }
                    <div className='d-flex justify-content-end'>
                        <div>Итого:</div>
                        <strong className='ms-1'>{totalSum}</strong>
                        <small className='ms-1' style={{paddingTop: '0.15rem'}}>грн.</small>
                    </div>
                    <div className='d-flex flex-column justify-content-between align-items-start mb-2'>
                        <h5>Заказчик:</h5>
                        <div className='d-flex'>
                           <strong className='me-1'>Имя:</strong>
                           <div>{item.name}</div>
                        </div>
                        <div className='d-flex'>
                            <strong className='me-1'>Телефон:</strong>
                            <div>{item.phone}</div>
                        </div>
                        <div className='d-flex'>
                            <strong className='me-1'>Email:</strong>
                            <div>{item.email}</div>
                        </div>
                    </div>
                    <Button
                        variant='danger'
                        size='sm'
                        disabled={isFetching ? true : false}
                        onClick={deleteOneOrder}
                    >Удалить заказ</Button>
                </>
            }
        </div>
    )
}

export default OrderItemSmallScreen
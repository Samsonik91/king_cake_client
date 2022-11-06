import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux"
import decode from 'jwt-decode'
import {Link, useLocation, useNavigate} from "react-router-dom"
import {Badge, Button, NavDropdown} from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCartShopping} from "@fortawesome/free-solid-svg-icons"
import styles from './navbar.module.scss'
import KingCake from '../../images/king_cake.png'
import Logo from '../../images/logo.png'
import {SETCARTCOUNT} from "../../store/actionTypes"
import Swal from "sweetalert2"

const NavBar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const [isUser, setIsUser] = useState(true)

    const {cartCount} = useSelector(({cart})=> cart)

    const token = localStorage.getItem('token')
    let cart = JSON.parse(localStorage.getItem('cart'))

    const toCart = () => {
        navigate('/cart')
    }

    const toggleLogin = () => {
        if(token){
            Swal.fire({
                title: 'Выход',
                text: 'Вы уверены что хотите выйти?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Выйти',
                cancelButtonText: `Отмена`,
            }).then(async (result) => {
                if (result.isConfirmed) {
                    dispatch({type: SETCARTCOUNT, payload: null})

                    localStorage.removeItem('token')
                    localStorage.removeItem('cart')
                    localStorage.removeItem('cartCount')
                    localStorage.removeItem('selectedType')

                    setIsUser(true)
                    navigate('/')
                }else {
                    return true
                }
            })
        }else{
            navigate('/auth')
        }
    }

    useEffect(()=>{
        if(token){
            const decodedToken = decode(token)
            const isUser = decodedToken.role === 'USER'
            setIsUser(isUser)

            if (decodedToken.exp * 1000 < new Date().getTime()){
                localStorage.removeItem('token')
            }
        }else{
            setIsUser(true)
        }

    },[location])

    useEffect(()=>{
        if(cart?.length > 0 && cartCount === 0){
            dispatch({type: SETCARTCOUNT, payload: JSON.parse(localStorage.getItem('cartCount'))})
        }
    },[cartCount])

    return (
        <div className={`d-flex justify-content-between p-3 ps-4 pe-4 ${styles.navbar}`}>
            <div className='d-flex align-items-end'>
                <Link to='/'>
                    <img
                        className={styles.mainImage}
                        src={KingCake}
                    />
                </Link>
                <Link
                    to='/'
                    className='d-none d-md-inline-block'>
                    <img
                        className={styles.logo}
                        src={Logo}
                    />
                </Link>
            </div>
            <div className='d-none d-sm-flex flex-column justify-content-between'>
                <div className='d-flex align-items-center justify-content-end position-relative'>
                    <div
                        className='mt-2'
                        role='button'
                        onClick={toCart}
                    >Корзина</div>
                    <FontAwesomeIcon
                        icon={faCartShopping}
                        role='button'
                        className='d-inline-block fs-4 ms-1'
                        onClick={toCart}
                    >
                    </FontAwesomeIcon>
                    {cartCount > 0 &&
                        <h5>
                            <Badge
                                pill
                                bg="warning"
                                role='button'
                                className={`position-absolute ${styles.badge}`}
                                onClick={toCart}
                            >{cartCount}</Badge>
                        </h5>
                    }
                </div>
                <div className='d-flex justify-content-start'>
                    {!isUser &&
                        <Link to='/admin'>
                            <Button
                                variant="light"
                                className="ps-4 pe-4"
                            >
                                Админ
                            </Button>
                        </Link>}
                    <Button
                        variant="light"
                        className='ms-3 ps-4 pe-4'
                        onClick={toggleLogin}
                    >
                        {!token ? 'Войти' : 'Выйти'}
                    </Button>
                </div>
            </div>
            <div className='d-flex d-sm-none justify-content-center align-items-end fs-5'>
                <NavDropdown
                    id="nav-dropdown-dark-example"
                    title="Меню"
                    menuVariant="light"
                >
                    {!isUser &&
                        <NavDropdown.Item>
                            <Link
                                to='/admin'
                                className='text-decoration-none text-black'
                            >
                                Админ
                            </Link>
                        </NavDropdown.Item>
                    }
                    {token &&
                        <>
                            <NavDropdown.Item>
                                <Link
                                    to='/cart'
                                    className='text-decoration-none text-black'
                                >
                                    Корзина
                                </Link>
                            </NavDropdown.Item>
                            <NavDropdown.Divider/>
                        </>
                    }
                    <NavDropdown.Item
                        as='button'
                        onClick={toggleLogin}
                    >
                        {!token ? 'Войти' : 'Выйти'}
                    </NavDropdown.Item>
                </NavDropdown>
            </div>
        </div>
    )
}

export default NavBar


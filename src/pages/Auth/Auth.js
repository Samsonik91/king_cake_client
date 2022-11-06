import React, {useState} from 'react'
import styles from './auth.module.scss'
import {useNavigate} from "react-router-dom"
import {Button, Container, Form} from "react-bootstrap"
import {login, registration} from "../../api/userApi"
import Swal from "sweetalert2"

const Auth = () => {
    const navigate = useNavigate()

    const [isLogin, setIsLogin] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [phone, setPhone] = useState('')

    const cart = localStorage.getItem('cart')

    const handleSubmit = async(e) => {
        e.preventDefault()
        let formData = !isLogin ? {email, password, confirmPassword, firstName, lastName, phone} : {email, password}
        if(!isLogin){
            try{
                const {data} = await registration(formData)
                setConfirmPassword('')
                setFirstName('')
                setLastName('')
                setPhone('')
                setIsLogin(true)
                return Swal.fire({
                    text: data.message,
                    icon: 'success',
                    timer: 4000
                })
            }catch (e) {
                return Swal.fire({
                    title: 'Ошибка',
                    text: e.message,
                    icon: 'error',
                    timer: 4000
                })
            }
        }else{
            try{
                const {data} = await login(formData)
                localStorage.setItem('token', JSON.stringify(data.token))
                if(!cart) localStorage.setItem('cart', JSON.stringify([]))
                navigate(-1)
            }catch (e) {
                return Swal.fire({
                    title: 'Ошибка',
                    text: e.message,
                    icon: 'error',
                    timer: 4000
                })
            }
        }
    }

    return (
        <Container className={`mt-5 mb-5 p-3 border border-secondary border-1 rounded-1 ${styles.container}`}>
            <Form>
                <h5 className='mt-2 mb-3 text-center'>
                    {isLogin ? 'Вход' : 'Регистрация'}
                </h5>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Введите email"
                        onChange={(e)=> setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Пароль</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Введите пароль"
                        title='Пароль должен иметь в себе не менее 6 и не более 15 символов, из которых хотя бы один должен быть заглавной буквой. Ещё в пароле должна быть как минимум одна цифра'
                        onChange={(e)=> setPassword(e.target.value)}
                    />
                </Form.Group>
                {
                    !isLogin &&
                    <>
                        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                            <Form.Label>Подтвердите пароль</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Подтвердите пароль"
                                onChange={(e)=> setConfirmPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicFirstName">
                            <Form.Label>Имя</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Введите имя"
                                onChange={(e)=> setFirstName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicLastName">
                            <Form.Label>Фамилия</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Введите фамилию"
                                onChange={(e)=> setLastName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPhone">
                            <Form.Label>Телефон</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Введите номер телефона"
                                onChange={(e)=> setPhone(e.target.value)}
                            />
                        </Form.Group>
                    </>
                }
                <h6
                    onClick={()=> setIsLogin(!isLogin)}
                    className='mt-2 mb-4 text-primary text-center'
                    role='button'
                >
                    {isLogin ? 'У меня нет аккаунта' : 'У меня уже есть аккаунт'}
                </h6>
                <div className='text-center'>
                    <Button
                        variant="info"
                        onClick={handleSubmit}
                    >
                        Подтвердить
                    </Button>
                </div>
            </Form>
        </Container>

    )
}

export default Auth
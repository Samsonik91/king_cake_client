import React, {useEffect, useState} from 'react'
import {Button, Container} from "react-bootstrap"
import {useNavigate} from "react-router-dom"
import AdminModal from "../components/modals/AdminModal"
import {getTypes} from "../thunks/type"
import {useDispatch, useSelector} from "react-redux"

const Admin = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [visible, setVisible] = useState(false)
    const [variant, setVariant] = useState(null)

    const token = localStorage.getItem('token')

    const {types} = useSelector(({type})=> type)

    const showModal = (val) => {
        setVariant(val)
        setVisible(true)
        dispatch(getTypes())
    }

    const onHide = () => setVisible(false)

    useEffect(()=>{
        if(!token) navigate('/auth')
    },[token])

    return (
        <Container className='col-12 col-md-8 col-lg-6 mt-5 d-flex flex-column align-items-center gap-4'>
            <Button variant="primary" onClick={()=>showModal('type')} className='w-100'>
                Добавить новый тип
            </Button>
            <Button variant="primary" onClick={()=>showModal('cake')} className='w-100'>
                Добавить новый торт
            </Button>
            <Button variant='primary' onClick={()=> navigate('/orderList')} className='w-100'>
                Посмотреть заказы
            </Button>
            <AdminModal show={visible} variant={variant} onClose={onHide} types={types}/>
        </Container>
    )
}

export default Admin
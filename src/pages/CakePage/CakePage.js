import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {useNavigate, useParams} from "react-router-dom"
import {getCakes, getCakeThunk} from "../../thunks/cake"
import {Col, Container, Row, Button} from "react-bootstrap"
import styles from './cakePage.module.scss'
import noPhoto from '../../images/cake_noFoto.jpg'
import AddToCart from "../../components/AddToCart"
import {SETCAKE} from "../../store/actionTypes"

const CakePage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {id} = useParams()

    const {cakes, selectedType, sortBy, page, cake} = useSelector(({cake})=> cake)

    const localSelectedType = JSON.parse(localStorage.getItem('selectedType'))
    const localSortBy = JSON.parse(localStorage.getItem('sortBy'))
    const localPage = JSON.parse(localStorage.getItem('selectedPage'))

    const isProd = (process.env.NODE_ENV === 'production')
    const URL = isProd ? "https://king-cake.herokuapp.com/" : "http://localhost:5000/"

    const price = cake?.price
    const ingredients = cake?.ingredients

    useEffect(()=>{
        if(!cakes) dispatch(getCakes(localSelectedType, localSortBy, localPage))
        localStorage.setItem('selectedPage', JSON.stringify(page))
        localStorage.setItem('selectedType', JSON.stringify(selectedType))
        localStorage.setItem('sortBy', JSON.stringify(sortBy))
    },[])

    useEffect(()=>{
        if(cakes){
            const item = cakes.filter(c=> c.id === +id)
            console.log(item)
            if(item.length === 0) {
                console.log(`id: ${+id}`)
                dispatch(getCakeThunk(+id))
            }else{
                dispatch({type: SETCAKE, payload: item[0]})
            }
        }
    },[])

    return (
        <Container className={`mb-4 mt-4 ps-4 ps-sm-0 ${styles.container}`}>
            <Row className='w-100'>
                <Col md={6}>
                    <img
                        src={cake ? URL + cake.img : noPhoto}
                        className={`pe-sm-2 pe-md-3 pe-lg-4 ${styles.image}`}
                    />
                </Col>
                <Col md={6} className='mt-3 mt-sm-0'>
                    <h4 className='text-center mb-4'>{cake?.name}</h4>
                    <p className='mb-3'>{cake?.description}</p>
                    <h6>Ингридиенты:</h6>
                    <ul>
                        {ingredients && ingredients.split(',').map(i=>(
                            <li key={i}>{i}</li>
                        ))}
                    </ul>
                    <div className='mt-5'>
                        {price && <AddToCart price={price} cake={cake} ownPage={true}/>}
                    </div>
                    <div className='mt-5'>
                        <Button
                            className='w-100'
                            variant='primary'
                            onClick={()=> navigate(-1)}
                        >
                            Вернуться назад
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default CakePage
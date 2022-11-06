import React, {useState} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {Card} from "react-bootstrap"
import styles from './cakeCard.module.scss'
import {Link} from "react-router-dom"
import AddToCart from "../AddToCart"
import {faCircleXmark} from "@fortawesome/free-regular-svg-icons"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {deleteCakeThunk} from "../../thunks/cake"
import Swal from "sweetalert2"

const CakeCard = ({cake}) => {
    const dispatch = useDispatch()

    const [showDelete, setShowDelete] = useState(false)

    const {isFetching} = useSelector(({cake})=> cake)

    const isProd = (process.env.NODE_ENV === 'production')
    const URL = isProd ? "https://king-cake.herokuapp.com/" : "http://localhost:5000/"

    const price = cake.price
    const ingredients = cake.ingredients

    const deleteItem = async () => {
        Swal.fire({
            title: 'Вы уверены что хотите удалить товар?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Удалить',
            cancelButtonText: `Отмена`,
        }).then(async (result) => {
            if (result.isConfirmed) {
                await dispatch(deleteCakeThunk(cake.id))
                window.location.reload()
            } else {
                return true
            }
        })
    }

    return (
            <Card
                className={styles.card}
                onMouseEnter={()=> setShowDelete(true)}
                onMouseLeave={()=> setShowDelete(false)}
            >
                <Link to={`/${cake.id}`}>
                    <Card.Img
                        variant="top"
                        src={URL + cake.img}
                        className={styles.img}
                    />
                </Link>
                <Card.Body>
                    <Link to={`/${cake.id}`} className={styles.link}>
                        <Card.Title
                            className={styles.title}
                        >{cake.name}</Card.Title>
                    </Link>
                    <Card.Text
                        className={`text-center ${styles.text}`}
                        title={ingredients}
                    >
                        {ingredients.length > 58 ? `${ingredients.slice(0,58)}...` : ingredients}
                    </Card.Text>
                    {price && <AddToCart key={price.id} price={price} cake={cake}/>}
                </Card.Body>
                <FontAwesomeIcon
                    icon={faCircleXmark}
                    role='button'
                    size='2xl'
                    color='grey'
                    title='Удалить торт'
                    className={styles.delete}
                    disabled={isFetching}
                    style={{display: showDelete ? 'block' : 'none'}}
                    onClick={deleteItem}
                ></FontAwesomeIcon>
            </Card>
    )
}

export default CakeCard
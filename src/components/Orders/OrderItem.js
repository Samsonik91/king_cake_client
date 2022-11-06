import React, {useState} from 'react'
import {useDispatch} from "react-redux"
import {deleteOrder} from "../../thunks/cart"
import OrderItemSmallScreen from "./OrderItemSmallScreen/OrderItemSmallScreen"
import OrderItemBigScreen from "./OrderItemBigScreen/OrderItemBigScreen"
import Swal from "sweetalert2"

const OrderItem = ({item}) => {
    const dispatch = useDispatch()

    const [showDetails, setShowDetails] = useState(false)

    const isProd = (process.env.NODE_ENV === 'production')
    const URL = isProd ? "https://king-cake.herokuapp.com/" : "http://localhost:5000/"

    const deleteOneOrder = () => {
        Swal.fire({
            title: 'Удаление заказа',
            text: 'Вы уверены что хотите удалить заказ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Удалить',
            cancelButtonText: `Отмена`,
        }).then(async (result) => {
            if (result.isConfirmed) {
                const message = await dispatch(deleteOrder(item.id))
                Swal.fire({
                    title: message,
                    icon: 'success',
                    timer: 4000
                })
            } else {
                return true
            }
        })
    }

    return (
        <div>
            <div className='d-block d-md-none'>
                <OrderItemSmallScreen
                    item={item}
                    setShowDetails={setShowDetails}
                    showDetails={showDetails}
                    deleteOneOrder={deleteOneOrder}
                    URL={URL}
                />
            </div>
            <div className='d-none d-md-block'>
                <OrderItemBigScreen
                    item={item}
                    setShowDetails={setShowDetails}
                    showDetails={showDetails}
                    deleteOneOrder={deleteOneOrder}
                    URL={URL}
                />
            </div>
        </div>
    )
}

export default OrderItem
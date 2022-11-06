import {Routes, Route, Navigate} from 'react-router-dom'
import Main from "../pages/Main/Main"
import Auth from "../pages/Auth/Auth"
import Cart from "../pages/Cart"
import CakePage from "../pages/CakePage/CakePage"
import Admin from "../pages/Admin"
import OrderList from "./Orders/OrderList"

const AppRouter = () => {

    return (
        <Routes>
            <Route path='/' element={<Main/>}/>
            <Route path='/auth' element={<Auth/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/:id' element={<CakePage/>}/>
            <Route path='/admin' element={<Admin/>}/>
            <Route path='/orderList' element={<OrderList/>}/>
            <Route path="*" element={<Navigate to='/' replace/>} />
        </Routes>
    )
}

export default AppRouter
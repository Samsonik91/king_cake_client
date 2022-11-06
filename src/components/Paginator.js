import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux"
import Pagination from 'react-bootstrap/Pagination'
import {SETPAGE} from "../store/actionTypes"

const Paginator = () => {
    const dispatch = useDispatch()

    const {totalPages, page} = useSelector(({cake})=> cake)

    const [total, setTotal] = useState(1)
    const [active, setActive] = useState(page || 1)

    let items = []
    for (let number = 1; number <= total; number++) {
        items.push(
            <Pagination.Item
                key={number}
                active={number === active}
                onClick={()=>setActive(number)}
            >
                {number}
            </Pagination.Item>
        )
    }

    useEffect(()=>{
        setTotal(totalPages)
    },[totalPages])

    useEffect(()=>{
        dispatch({type: SETPAGE, payload: active})
    },[active])

    useEffect(()=>{
        setActive(page)
    },[page])

    return (
        <Pagination>{items}</Pagination>
    )
}

export default Paginator
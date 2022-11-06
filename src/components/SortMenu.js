import React from 'react'
import {useDispatch} from "react-redux"
import {NavDropdown} from "react-bootstrap"
import {SETPAGE, SETSORTBY} from "../store/actionTypes"

const SortMenu = () => {

    const dispatch = useDispatch()

    const setSortBy = (sort) => {
        dispatch({type: SETSORTBY, payload: sort})
        dispatch({type: SETPAGE, payload: 1})
    }

    return (
        <NavDropdown
            id="nav-dropdown-dark-example"
            title="Сортировать по:"
            menuVariant="white"
            className='ms-0 ms-md-2 me-3 me-md-0'
        >
            <NavDropdown.Item
                onClick={()=>setSortBy(null)}
            >
                Все подряд
            </NavDropdown.Item>
            <NavDropdown.Item
                onClick={()=>setSortBy('fromCheapToExpansive')}
            >
                Цене: от дешевых к дорогим
            </NavDropdown.Item>
            <NavDropdown.Item
                onClick={()=>setSortBy('fromExpansiveToChip')}
            >
                Цене: от дорогих к дешевым
            </NavDropdown.Item>
        </NavDropdown>
    )
}

export default SortMenu
import React from 'react'
import {useDispatch, useSelector} from "react-redux"
import {Dropdown, DropdownButton} from "react-bootstrap"
import {SELECTTYPE, SETPAGE} from "../store/actionTypes"

const TypesMenu = () => {

    const dispatch = useDispatch()

    const {types} = useSelector(({type})=> type)

    const selectType = (type) => {
        dispatch({type: SELECTTYPE, payload: type})
        dispatch({type: SETPAGE, payload: 1})
    }

    return (
        <DropdownButton
            id="dropdown-basic-button"
            title="Типы тортов"
            className='ms-3 ms-md-0'
        >
            <Dropdown.Item
                onClick={()=> selectType(null)}
            >Все</Dropdown.Item>
            {types && types.map(t=>(
                <Dropdown.Item
                    key={t.name}
                    onClick={()=> selectType(t.id)}
                >{t.name}</Dropdown.Item>
            ))}
        </DropdownButton>
    )
}

export default TypesMenu
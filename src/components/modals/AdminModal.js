import React, {useState} from 'react'
import {useDispatch} from "react-redux"
import {Button, Col, Dropdown, Form, Modal, Row} from "react-bootstrap"
import {createType} from "../../thunks/type"
import {createCakeThunk} from "../../thunks/cake"

const AdminModal = ({types, show, variant, onClose}) => {
    const dispatch = useDispatch()

    const [typeName, setTypeName] = useState('')
    const [cakeName, setCakeName] = useState('')
    const [cakeType, setCakeType] = useState(null)
    const [description, setDescription] = useState('')
    const [ingredients, setIngredients] = useState('')
    const [prices, setPrices] = useState([])
    const [image, setImage] = useState(null)

    const createNewType = () => {
        if(types){
            for(let i=0; i<types.length; i++){
                if(types[i].name === typeName){
                    return alert('Тип тортов с таким названием уже существует')
                }
            }
        }
        setTypeName('')
        onClose()
        dispatch(createType({typeName}))
    }

    const selectFile = e => {
        setImage(e.target.files[0])
    }

    const addPrice = () => {
        setPrices([...prices, {weight: '', value: '', number: Date.now()}])
    }

    const changePrice = (key, value, number) => {
        setPrices(prices.map(p=> p.number === number ? {...p, [key]: value} : p))
    }

    const removePrice = (number) => {
        setPrices(prices.filter(p=> p.number !== number))
    }

    const createNewCake = () => {
        const formData = new FormData()

        for(let i=0; i<prices.length; i++){
            delete(prices[i].number)
        }

        formData.append('name', cakeName)
        formData.append('type', cakeType.id)
        formData.append('description', description)
        formData.append('img', image)
        formData.append('prices', JSON.stringify(prices))
        formData.append('ingredients', ingredients)

        setCakeName('')
        setCakeType(null)
        setIngredients('')
        setPrices([])
        setImage(null)
        setDescription('')

        onClose()
        dispatch(createCakeThunk(formData))
    }

    const addNewItem = () => {
        if(variant === 'type') return createNewType()
        if(variant === 'cake') return createNewCake()
    }

    return (
        <>
            <Modal
                show={show}
                onHide={onClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        {variant === 'cake' && 'Добавить новый торт'}
                        {variant === 'type' && 'Добавить новый тип'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {variant === 'type' &&
                            <Form.Group controlId="exampleForm.ControlInput1">
                                <Form.Label>Название</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={typeName}
                                    placeholder="Введите название нового типа тортов"
                                    autoFocus
                                    onChange={(e)=> setTypeName(e.target.value)}
                                />
                            </Form.Group>
                        }
                        {variant === 'cake' &&
                            <>
                                <Form.Group
                                    controlId="exampleForm.ControlInput1"
                                    className='mb-3'
                                >
                                    <Form.Label>Название</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={cakeName}
                                        placeholder="Введите название нового торта"
                                        autoFocus
                                        onChange={(e)=> setCakeName(e.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group
                                    controlId="exampleForm.ControlTextarea1"
                                    className='mb-4'
                                >
                                    <Form.Label>Описание продукта</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={5}
                                        value={description}
                                        placeholder='Не менее одного и не более 2000 символов'
                                        onChange={(e)=> setDescription(e.target.value)}
                                    />
                                </Form.Group>
                                <Dropdown className='mb-3'>
                                    <Dropdown.Toggle>{cakeType ? cakeType.name : 'Выберите тип'}</Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        {types ? types.map(type=> <Dropdown.Item
                                                    key={type.name}
                                                    onClick = {()=> setCakeType(type)}
                                                    >{type.name}</Dropdown.Item>
                                                ) :
                                                <div className="spinner-border text-primary" role="status">
                                                    <span className="visually-hidden">Loading...</span>
                                                </div>
                                            }
                                    </Dropdown.Menu>
                                </Dropdown>
                                <Form.Group className='mb-4'>
                                    <Form.Label>Добавить фото</Form.Label>
                                    <Form.Control
                                        type='file'
                                        onChange={selectFile}
                                    />
                                </Form.Group>
                                <Form.Group
                                    controlId="exampleForm.ControlTextarea2"
                                    className='mb-4'
                                >
                                    <Form.Label>Ингридиенты</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={5}
                                        value={ingredients}
                                        placeholder='Перечислите ингридиенты разделяя их запятой'
                                        onChange={(e)=> setIngredients(e.target.value)}
                                    />
                                </Form.Group>
                                <Button
                                    className='mb-3'
                                    onClick={addPrice}
                                >
                                    Добавить вес и цену
                                </Button>
                                {prices.map((p,i)=>
                                    <Row
                                        className='mb-3'
                                        key={p.number}
                                    >
                                        <Col md={4}>
                                            <Form.Group
                                                controlId="exampleForm.ControlInputWeight1"
                                            >
                                                <Form.Label>Вес</Form.Label>
                                                <Form.Control
                                                    type='number'
                                                    value={p.weight}
                                                    autoFocus
                                                    onChange={(e)=> changePrice('weight', e.target.value, p.number)}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Group
                                                controlId="exampleForm.ControlInputPrice1"
                                                className='mt-3 mt-md-0'
                                            >
                                                <Form.Label>Цена</Form.Label>
                                                <Form.Control
                                                    type='number'
                                                    value={p.value}
                                                    autoFocus
                                                    onChange={(e)=> changePrice('value', e.target.value, p.number)}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={4}
                                            className='d-flex justify-content-center align-items-end'
                                        >
                                            <Button
                                                variant='danger'
                                                className='mt-4 mt-md-0'
                                                onClick={()=> removePrice(p.number)}
                                            >
                                                Удалить цену
                                            </Button>
                                        </Col>
                                    </Row>
                                )}
                            </>
                        }
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onClose}>
                        Закрыть
                    </Button>
                    <Button variant="primary" onClick={addNewItem}>
                        Подтвердить
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AdminModal
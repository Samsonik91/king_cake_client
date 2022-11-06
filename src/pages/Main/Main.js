import React, {useEffect} from 'react'
import styles from './main.module.scss'
import {useDispatch, useSelector} from "react-redux"
import {getTypes} from "../../thunks/type"
import {getCakes} from "../../thunks/cake"
import {Col, Row} from "react-bootstrap"
import CakeCard from "../../components/Card/CakeCard"
import SkeletonCard from "../../components/SkeletonCard/SkeletonCard"
import Paginator from "../../components/Paginator"
import TypesMenu from "../../components/TypesMenu"
import SortMenu from "../../components/SortMenu"

const Main = () => {

    const dispatch = useDispatch()

    const {cakes, selectedType, sortBy, page} = useSelector(({cake})=> cake)

    const skeletons = Array(4).fill(0)

    useEffect(()=>{
        dispatch(getTypes())
    },[])

    useEffect(()=> {
        dispatch(getCakes(selectedType, sortBy, page))
    },[selectedType, sortBy, page])

    return (
        <div className={`mt-5 d-flex ${styles.container}`}>
            <div className='d-none d-md-block'>
                <TypesMenu/>
            </div>
            <div className='ms-4 d-flex flex-column align-items-start gap-3 w-100'>
                <div className='d-flex d-md-none justify-content-between align-items-end w-100'>
                    <TypesMenu/>
                    <SortMenu/>
                </div>
                <div className='d-none d-md-block'>
                    <SortMenu/>
                </div>
                <div className='d-flex flex-column justify-content-between align-items-center w-100'>
                    <Row className='w-100'>
                        {cakes ? cakes.map(c=>(
                                <Col xs={12} sm={6} lg={4} xl={3}
                                     key={c.name}
                                     className='pb-4'
                                >
                                    <CakeCard cake={c}/>
                                </Col>
                            ))
                            :
                            skeletons.map((s,i)=> (
                                <Col xs={12} sm={6} lg={4} xl={3}
                                     key={i}
                                     className='pb-4'
                                >
                                    <SkeletonCard/>
                                </Col>
                            ))
                        }
                    </Row>
                    {cakes ? <Paginator/>
                        :
                        <div className='border border-1 border-secondary rounded-1 opacity-50 p-1 ps-2 pe-2'>1</div>}
                </div>
            </div>
        </div>
    )
}

export default Main
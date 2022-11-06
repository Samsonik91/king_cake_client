import React from 'react'
import styles from './skeletonCard.module.scss'
import {Card, Spinner} from "react-bootstrap"
import noPhoto from '../../images/cake_noFoto.jpg'

const SkeletonCard = () => {
    return (
        <div className='position-relative'>
            <Card className='w-100 h-100'>
                <Card.Img
                    variant="top"
                    className='opacity-50'
                    src={noPhoto}
                />
                <Card.Body>
                    <Card.Title className={`bg-secondary opacity-25 mb-3 rounded-1 ${styles.title}`}>

                    </Card.Title>
                    <Card.Text className='d-flex justify-content-between'>
                        <div className={`bg-secondary opacity-25 rounded-1 ${styles.lowerWideBlock}`}></div>
                        <div className={`bg-secondary opacity-25 rounded-1 w-25' ${styles.lowerNarrowBlock}`}></div>
                    </Card.Text>
                </Card.Body>
            </Card>
            <div className={`position-absolute ${styles.spinnerBlock}`}>
                <Spinner animation="border" variant="primary" />
            </div>
        </div>
    )
}

export default SkeletonCard
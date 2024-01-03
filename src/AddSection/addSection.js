import React from 'react'
import './addSection.css'
import {card} from "react-bootstrap"
const AddSection = ({open}) => {
    if (open){
        return (
        <div className='modal'>
            This is the Modal

        </div>
        )
    }
    else{
        return null
    }
}

export default AddSection
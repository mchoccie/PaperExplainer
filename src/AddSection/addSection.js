import React from 'react'
import './addSection.css'
import CloseButton from 'react-bootstrap/CloseButton';
import {card} from "react-bootstrap"
const AddSection = ({open, setSectionModal}) => {
    const close = () => {
        setSectionModal(false)
    }
    if (open){
        return (
        <div className='modal-overlay'>
            
            <div className='modal'>
                <button onClick={close} type="button" class="close-button" aria-label="Close">X</button>
                This is the Modal
            </div>
        </div>

        )
    }
    else{
        return null
    }
}

export default AddSection
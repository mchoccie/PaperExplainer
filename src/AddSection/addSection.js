import React, {useState} from 'react'
import './addSection.css'
import CloseButton from 'react-bootstrap/CloseButton';
import {card} from "react-bootstrap"
const AddSection = ({open, setSectionModal}) => {
    const [sectionName, setSectionName] = useState("")
    const [description, setDescription] = useState("")

    const handleSectionNameChange = (event) => {
        setSectionName(event.target.value)
    }

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value)
    }
    const close = () => {
        setSectionModal(false)
    }
    if (open){
        return (
        <div className='modal-overlay'>
            
            <div className='modal'>
                <button onClick={close} type="button" class="close-button" aria-label="Close">X</button>
                <form>
                    <label>Section Name:</label>
                    <input type="text" value={sectionName} onChange={handleSectionNameChange}/>

                    <label>Description</label>
                    <input type="text" value={description} onChange={handleDescriptionChange}/>

                    <button type="submit">Create</button>
                </form>
            </div>
        </div>

        )
    }
    else{
        return null
    }
}

export default AddSection
import React, {useState} from 'react'
import './addSection.css'
import CloseButton from 'react-bootstrap/CloseButton';
import {card} from "react-bootstrap"
const AddSection = ({open, setSectionModal, handleForm}) => {
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

    const sendDataBack = (sectionName, description) => {
        handleForm(sectionName, description)
        setSectionModal(false)


    }
    if (open){
        return (
        <div className='modal-overlay'>
            
            <div className='modal'>
                <button onClick={close} type="button" className="close-button" aria-label="Close">X</button>
                <form>
                    <label>Section Name:</label>
                    <input type="text" value={sectionName} onChange={handleSectionNameChange}/>

                    <label>Description</label>
                    <input type="text" value={description} onChange={handleDescriptionChange}/>

                    <button onClick={(e) => {e.preventDefault(); sendDataBack(sectionName, description)}} className="createRecord" type="submit">Create</button>
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
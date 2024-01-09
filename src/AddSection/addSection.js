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

    const handleSectionSave = async (sectionName, description) => {
        handleForm(sectionName, description)
        setSectionModal(false)
        try {
            const response = await fetch('http://localhost:3001/sectionCreate', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ sectionName, description }),
            });
      
            if (response.ok) {
              console.log('Section data sent successfully.');
            } else {
              console.error('Section data sending failed.');
            }
          } catch (error) {
            console.error('Error sending data', error);
          }


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

                    <button onClick={() => {handleSectionSave(sectionName, description)}} className="createRecord" type="submit">Create</button>
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
import React, {useState} from 'react'
import './fileList.css'
import CloseButton from 'react-bootstrap/CloseButton';
import {card} from "react-bootstrap"
const FileList = ({open, setSectionFiles, selectedCard}) => {

    const[selectedFile, setSelectedFile] = useState(null)

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0])
    }

    const handleFileUpload = () => {

    }

    const close = () => {
        setSectionFiles(false)
    }
        if(open){
            return (
            <div className='modal-overlay-2'>
                
                <div className='fileModal'>
                    <button onClick={close} type="button" className="close-button-2" aria-label="Close">X</button>
                    {selectedCard}
                    <input type="file" className="FileUploadField" onChange={handleFileChange}/>
                    <div className="uploadButton">
                        <button onClick={handleFileUpload}>Upload</button>
                    </div>
                </div>
            </div>

            )
        }
    
}

export default FileList
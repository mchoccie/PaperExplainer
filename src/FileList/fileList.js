import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import './fileList.css'
import CloseButton from 'react-bootstrap/CloseButton';
import {card} from "react-bootstrap"
const FileList = ({open, setSectionFiles, selectedCard}) => {

    //How to only use a useEffect get Request when a card is open

    const[selectedFile, setSelectedFile] = useState(null)
    const[retrievedFiles, setRetrievedFiles] = useState([])
    
    useEffect(() => {
        if(open){
        fetch(`http://localhost:3001/files/${selectedCard}`)
        .then(response => {
            if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json(); // This returns a Promise
        })
        .then(data => {
            // Handle the JSON data
            console.log(data);
 
            setRetrievedFiles(data.map((i) => {
                if (i != null){
                return i.name
                }
            }));

        })
        .catch(error => {
            // Handle errors
            console.error('Fetch error:', error);
  })}}, [open, selectedCard]);

    
    

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0])
    }

    const mapList = (fileName, index) => {
        return (
            <div>
                <Link to = "/pdfview">
                    {fileName}
                </Link>
            </div>
        )
    }

    const renderFileList = () => {
        return(
            <div>
                {retrievedFiles.map(mapList)}
            </div>
            
        )
    }

    const handleFileUpload = async () => {
        const formData = new FormData()
        formData.append('file', selectedFile);
        formData.append('cardName', selectedCard)
        try {
            const response = await fetch('http://localhost:3001/upload', {
              method: 'POST',
              body: formData,
            });
      
            if (response.ok) {
              console.log('File uploaded successfully.');
            } else {
              console.error('File upload failed.');
            }
          } catch (error) {
            console.error('Error uploading file:', error);
          }


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
                    {renderFileList()}
                </div>
            </div>

            )
        }
    
}

export default FileList
import './profile.css';
import ReactRoundedImage from "react-rounded-image"
import MyPhoto from "../images/Manan.JPG"
import roundedImage from './roundedImage';
import Navbar from '../NavBar/Navbar'
import React, {useState} from 'react';
import axios from "axios";

function Profile() {

    const [file, setFile] = useState()
    function changeFile(e){
        setFile(e.target.files[0])
    }

    function handleUpload(){
        const fd = new FormData();
        fd.append('file', file)

    }
    return (
    <div className='overall'>
        {/* <div className='nav'>
            <Navbar></Navbar>
        </div> */}
        <div className='title'>
            Paper Explainer
        </div>
        <div className="description">
            Upload a paper of your choice to get it analyzed!
        </div>
        <div className="container">
            
            <form className="upload" action="" onClick={() => document.querySelector(".FileUploadField").click()}>
                Upload file here
                <input type="file" className="FileUploadField" hidden/>
            
            </form>
        </div>
    </div>
    


      
      
    );
  }

export default Profile
import React, {useState, useEffect} from 'react'
import './dashboard.css'
import AddSection from '../AddSection/addSection'
import FileList from '../FileList/fileList'
import {Card} from "react-bootstrap"
const Dashboard = () => {
    const [sectionModal, setSectionModal] = useState(false)
    const [sectionFiles, setSectionFiles] = useState(false)
    const [selectedCard, setSelectedCard] = useState('')
    const [sectionName, setSectionName] = useState("")
    const [description, setDescription] = useState("")
    const [cardGroups, setCardGroups] = useState([])

    useEffect(() => {
        fetch('http://localhost:3001/cards')
        .then(response => {
            if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json(); // This returns a Promise
        })
        .then(data => {
            // Handle the JSON data
            console.log("here is the cards data")
            console.log(data);
            setCardGroups(data.map((entry) => ({
                name: entry.sectionName,
                description: entry.description
              })));

        })
        .catch(error => {
            // Handle errors
            console.error('Fetch error:', error);
  })}, []);


    const handleChildFormData = (sectionName, description) => {
        setSectionName(sectionName)
        setDescription(description)
        setCardGroups([...cardGroups, {name: sectionName, description: description}])
    }

    const handleCardClicked = (card) => {
        setSectionFiles(true)
        setSelectedCard(card.name)

    }
    

    const renderCard = (card, index) => {
        return (
            <Card className="clickable-card" onClick={() => handleCardClicked(card)} key={index}>
              <Card.Body>
                <Card.Title>{card.name}</Card.Title>
                <hr className="card-line" />
                <Card.Text>
                  {card.description}
                </Card.Text>
        
              </Card.Body>
            </Card>
        )
    }

    const renderSections = () => {
        if (cardGroups.length === 0){
        return (
            <h1>No cards have been created yet!</h1>
        )
        }
        else{
            return(
            <div className="grid-cards">
                {cardGroups.map(renderCard)}
            </div>
            
            )
        }
    }
    
    return(
        <div className="outer">
            <div>
                {renderSections()}
                
                <button onClick={() => setSectionModal(true)}>Add new section</button>

            </div>

            <div>
                <AddSection handleForm = {handleChildFormData} open={sectionModal} setSectionModal={setSectionModal}/>
                <FileList open={sectionFiles} setSectionFiles={setSectionFiles} selectedCard={selectedCard}/>
            </div>
            
        </div>
    )
    
}

export default Dashboard
import React, {useState} from 'react'
import './dashboard.css'
import AddSection from '../AddSection/addSection'
import {Card} from "react-bootstrap"
const Dashboard = () => {
    const [sectionModal, setSectionModal] = useState(false)
    const [sectionFiles, setSectionFiles] = useState(false)
    const [sectionName, setSectionName] = useState("")
    const [description, setDescription] = useState("")
    const [cardGroups, setCardGroups] = useState([
        {
            name: "GENAI",
            description: "Papers on generative AI"
        },
        {
            name: "Reinforcement Learning",
            description: "Papers on Reinforcement Learning"
        }
    ])
    const handleChildFormData = (sectionName, description) => {
        setSectionName(sectionName)
        setDescription(description)
        setCardGroups([...cardGroups, {name: sectionName, description: description}])
    }
    

    const renderCard = (card, index) => {
        return (
            <Card className="clickable-card" onClick={() => setSectionFiles(true)} key={index}>
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
            </div>
            
        </div>
    )
    
}

export default Dashboard
import React, {useState} from 'react'
import './dashboard.css'
import AddSection from '../AddSection/addSection'
import {Card} from "react-bootstrap"
const Dashboard = () => {
    const [sectionModal, setSectionModal] = useState(false)
    const cardGroups = [
        {
            name: "GENAI",
            description: "Papers on generative AI"
        },
        {
            name: "Reinforcement Learning",
            description: "Papers on Reinforcement Learning"
        }
    ]

    const renderCard = (card, index) => {
        return (
            <Card>
              <Card.Body>
                <Card.Title>{card.name}</Card.Title>
                <hr class="card-line" />
                <Card.Text>
                  {card.description}
                </Card.Text>
        
              </Card.Body>
            </Card>
        )
    }

    const renderSections = () => {
        if (cardGroups.length == 0){
        return (
            <h1>No cards have been created yet!</h1>
        )
        }
        else{
            return(
            <div>{cardGroups.map(renderCard)}</div>
            )
        }
    }
    
    return(
        <div>
            {renderSections()}
            <button onClick={() => setSectionModal(true)}>Add new section</button>
            <AddSection open={sectionModal}/>
        </div>
    )
    
}

export default Dashboard
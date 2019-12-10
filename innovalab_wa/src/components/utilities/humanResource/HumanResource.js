import React from 'react';
import Card from 'react-bootstrap/Card';
import imgHumanResourse from '../../../images/profileHumanResource.jpg';
import './HumanResource.css';

const HumanResource = (props) => {
    return (
        <Card className="cardBox mx-0 my-2 py-3">
            <Card.Img variant="top" src={imgHumanResourse} className="cardImage rounded-circle align-self-center" />
            <Card.Body>
                <Card.Title className="cardTitle text-left">{props.person.resource_name}</Card.Title>
                <h5 className="cardTitle text-left mb-0">Perfil:</h5>
                <Card.Text className="cardText text-left">{props.person.resource_profile}</Card.Text>
                <h5 className="cardTitle text-left mb-0">Experiencia:</h5>
                <Card.Text className="cardText text-left">{props.person.resource_experience}</Card.Text>
            </Card.Body>
        </Card>
    );
}

export default HumanResource;
import React from 'react';
import { Col, Card, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { IconContext } from "react-icons";
import { IoIosCloseCircle } from 'react-icons/io';

import './ChallengeCard.css';

class ChallengeCard extends React.Component {

   render() {
      return (
         <Col className="mb-5">
            <Card className="formBox challengeCardBox">
               <Card.Body className="px-lg-3">
                  <Row className="mx-0">
                     <Col className="offset-lg-2">
                        <Card.Title className="challengeCardName text-center text-md-center text-lg-left ">{this.props.challengeName}</Card.Title>
                     </Col>
                     <Col xs="1">
                        <IconContext.Provider value={{ className: "logoutIcon" }}>
                           <span className="crossLink" onClick={this.props.deleteChallenge}>
                              <IoIosCloseCircle />
                           </span>
                        </IconContext.Provider>
                     </Col>
                  </Row>
                  <Row className="font-italic mx-0">
                     <Col className="mb-sm-3" lg={2}>
                        <b><i>{this.props.companyName}:</i></b>
                     </Col>
                     <Col lg={10}>
                        <Card.Text className="challengeCardCompanyDescription">
                           {this.props.companyDescription}
                        </Card.Text>
                     </Col>
                  </Row>
                  <Row className="mt-4 mx-0">
                     <Col sm={3} md={2} className="d-flex align-items-center">
                        <b><i>Reto:</i></b>
                     </Col>
                     <Col sm={9} md={10} >
                        <Card.Text className="challengeCardDescription">
                           {this.props.challengeDescription}
                        </Card.Text>
                     </Col>
                  </Row>
                  <Row className="d-flex justify-content-end mt-2 mt-md-1">
                     {
                        !this.props.isUserAnAdmin &&
                        (
                           <Link to={{
                              pathname: "/home/challengeDescription",
                              state: {
                                 idChallenge: this.props.challengeId,
                                 challengeName: this.props.challengeName,
                                 companyName: this.props.companyName,
                                 companyDescription: this.props.companyDescription,
                                 challengeDescription: this.props.challengeDescription,
                                 categories: this.props.categories,
                                 challengeDate: this.props.challengeDate
                              }
                           }}
                              className="challengeCardSeeMoreCardLink mr-4"
                           >
                              Ver más
                           </Link>
                        )
                     }
                  </Row>
                  <Row className="challengeCardCategories mx-0 mt-2 mt-md-1">
                     <Col sm={3} md={2} className="d-flex justify-content-left justify-content-sm-center">
                        <span className="w-auto"><i>Categorías:</i></span>
                     </Col>
                     <Col sm={9} md={10} className="d-flex justify-content-start">
                        <i className="w-auto challengeCardHashTags">{this.props.categories.map((item) => { return (`#${item.split(' ').map(a => a.trim()).map(a => a[0].toUpperCase() + a.substring(1)).join("")} `) })}</i>
                     </Col>
                  </Row>
               </Card.Body>
            </Card>
         </Col>
      );
   }
}


export default ChallengeCard;
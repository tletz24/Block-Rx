import React from 'react';
import './HomePage.css';
import { Card, CardGroup } from 'react-bootstrap';
/*import { David } from "./david.png";
import { Justin } from "./manish.png";
import { Manish } from "./justin.png";*/



function HomePage() {
    return (
        <div>
            <header>
                <section className="et-hero-tabs">
                    <h1>We are Health Wallet</h1>
                    <h3>Our Goal is to provide a simple yet effective platform to keep track of one's immunization records</h3>
                    <div className="et-hero-tabs-container">
                        <a className="et-hero-tab" href="#about-us">About Us</a>
                        <a className="et-hero-tab" href="#testimonials">Our Mission</a>
                        <a className="et-hero-tab" href="#technology">Technology</a>
                        <a className="et-hero-tab" href="#our-team">Our Team</a>
                        <span className="et-hero-tab-slider"></span>
                    </div>
                </section>
            </header>
            <main className="et-main">
                <section className="et-slide" id="about-us">
                    <h1>About Us</h1>
                    <h3>We are an Electrical Engineering and Computer Science Senior Design Group at the University of Toledo.
                    Our goal as part of the college of engineering is to come up with & implement a senior design project that relates to our field of study.
                    Our team is comprised of all Computer Science & Engineering (CSE) Majors; therefore our project deals exclusively with Computer Science & Software Engineering.</h3>
                </section>
                <section className="et-slide" id="testimonials">
                    <h1>Our Mission</h1>
                    <h3>Our mission is to create a better platform for the collection, storage and access of immunization records that will ultimately help everyone that takes part in the immunization process from doctors to patients. Our platform will be simple to use & available to all who participate.
                        Finally, our platform will also provide some added benefits for the government agencies that have a had in the immunization process.</h3>
                </section>
                <section className="et-slide" id="technology">
                    <h1>Technology</h1>
                    <h3>The technology that we will be using to build this platfrom spans from cloud computing, the latest and greatest in front end development, and the new & emerging blockchain technology.
                    With cloud computing, we can build our very resource-smart & scalable ecosystem for which to build our platform.
                    Using the latest front-end technologies we can provide a very simple to understand & effective user experice.
                    Finally, with the use of blockchain, we have an unparalleled level of security and tracability to the data which we consume.</h3>
                </section>
                <section className="et-slide" id="our-team">
                    <h1>Our Team</h1>
                    <CardGroup>
                        <Card style={{ width: '40rem', height: '40rem' }}>
                            <Card.Img style={{ width: '30rem', height: '30rem' }} variant="top" src="./manish.png" alt="Manish" />
                            <Card.Body>
                                <Card.Text>
                                    Manish
                             </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <small className="text-muted">Last updated 3 mins ago</small>
                            </Card.Footer>
                        </Card>
                        <Card style={{ width: '40rem', height: '40rem' }}>
                            <Card.Img style={{ width: '30rem', height: '30rem' }} variant="top" src="./justin.png" alt="Justin" />
                            <Card.Body>
                                <Card.Text>
                                    Justin
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <small className="text-muted">Last updated 3 mins ago</small>
                            </Card.Footer>
                        </Card>
                        <Card style={{ width: '40rem', height: '40rem' }}>
                            <Card.Img style={{ width: '30rem', height: '30rem' }} variant="top" src="./david.png" alt="David" />
                            <Card.Body>
                                <Card.Text>
                                    David
                            </Card.Text>
                            </Card.Body>
                            <Card.Footer>
                                <small className="text-muted">Last updated 3 mins ago</small>
                            </Card.Footer>
                        </Card>
                    </CardGroup>
                </section>
            </main>
        </div >
    );
}

export default HomePage;
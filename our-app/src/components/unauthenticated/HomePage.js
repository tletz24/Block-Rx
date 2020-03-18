import React from 'react';
import { Carousel } from 'react-bootstrap';

export default function HomePage() {
    const mystyle = {
        color: "Black",
        fontFamily: "Helvetica"
    };
    return (
        <div>
            <h1 style={mystyle}><b>Welcome to Health Wallet</b></h1>
            <Carousel>
                <Carousel.Item>
                    <img
                        width={800}
                        height={450}
                        alt="Welcome to Health Wallet"
                        src="/server/immunization.jpg"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        width={800}
                        height={450}
                        alt="Welcome to Health Wallet"
                        src="/server/immunization1.png"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        width={800}
                        height={450}
                        alt="Welcome to Health Wallet"
                        src="/server/immunization2.png"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        width={800}
                        height={450}
                        alt="Welcome to Health Wallet"
                        src="/server/immunization3.png"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        width={800}
                        height={450}
                        alt="Welcome to Health Wallet"
                        src="/server/immunization4.png"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        width={800}
                        height={450}
                        alt="Welcome to Health Wallet"
                        src="/server/immunization5.png"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        width={800}
                        height={450}
                        alt="Welcome to Health Wallet"
                        src="/server/immunization6.png"
                    />
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        width={800}
                        height={450}
                        alt="Welcome to Health Wallet"
                        src="/server/immunization7.png"
                    />
                </Carousel.Item>

            </Carousel>
        </div >
    );
}


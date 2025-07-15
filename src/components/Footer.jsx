// src/components/Footer.jsx
import React from "react";
import { Container } from "react-bootstrap";

const Footer = () => {
    return (
        <footer
            style={{
                backgroundColor: "#222",
                color: "#eee",
                padding: "20px 0",
                textAlign: "center",
                marginTop: "auto",
            }}
        >
            <Container>
                <p>Made By: Rishabh Maurya</p>
                <p>Contact Us: rishabhmaurya296034@gmail.com | Phone: +91 9911625492</p>
                <p>© 2025 VidXpress. All rights reserved.</p>
            </Container>
        </footer>
    );
};

export default Footer;

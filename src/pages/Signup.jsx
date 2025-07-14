import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { setDoc, doc } from "firebase/firestore";
import { Container, Row, Col, Card, Button, Form, Alert } from "react-bootstrap";

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState({ type: "", text: "" });
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setMessage({ type: "", text: "" });

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                email: user.email,
                createdAt: new Date()
            });

            setMessage({ type: "success", text: "Signup successful! Redirecting..." });

            setTimeout(() => navigate('/'), 1500);
        } catch (err) {
            setMessage({ type: "danger", text: "Signup failed: " + err.message });
        }
    };

    return (
        <div style={{ background: "linear-gradient(135deg, #74ebd5 0%, #9face6 100%)", minHeight: "100vh" }}>
            <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
                <Row>
                    <Col>
                        <Card className="p-4 shadow-lg" style={{ borderRadius: '20px', backgroundColor: 'white' }}>
                            <h3 className="text-center mb-4" style={{ color: "#5e60ce" }}>Create Account</h3>

                            {message.text && (
                                <Alert variant={message.type} className="text-center">
                                    {message.text}
                                </Alert>
                            )}

                            <Form onSubmit={handleSignup}>
                                <Form.Group className="mb-3" controlId="formEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-4" controlId="formPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Minimum 6 characters"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Button variant="primary" type="submit" className="w-100">
                                    Sign Up
                                </Button>
                            </Form>
                            <p className="text-center mt-3">Already have an account? <a href="/login">Login</a></p>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Signup;

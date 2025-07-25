import { useState } from "react";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Form, Alert } from "react-bootstrap";


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState({ type: "", text: "" });
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage({ type: "", text: "" });

        try {
            await signInWithEmailAndPassword(auth, email, password);
            setMessage({ type: "success", text: "Login successful! Redirecting..." });

            setTimeout(() => navigate('/'), 1500);
        } catch (err) {
            setMessage({ type: "danger", text: "Login failed: " + err.message });
        }
    };

    const handleForgotPassword = async () => {
        if (!email) {
            return setMessage({ type: "warning", text: "Please enter your email to reset password." });
        }

        try {
            await sendPasswordResetEmail(auth, email);
            setMessage({ type: "info", text: "Password reset email sent!" });
        } catch (err) {
            setMessage({ type: "danger", text: "Error: " + err.message });
        }
    };

    return (
        <div style={{ background: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)", minHeight: "100vh" }}>
            <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
                <Row>
                    <Col>
                        <Card className="p-4 shadow-lg" style={{ borderRadius: '20px', backgroundColor: 'white' }}>
                            <h3 className="text-center mb-4" style={{ color: "#f77f00" }}>Welcome Back</h3>

                            {message.text && (
                                <Alert variant={message.type} className="text-center">
                                    {message.text}
                                </Alert>
                            )}

                            <Form onSubmit={handleLogin}>
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

                                <Form.Group className="mb-3" controlId="formPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <Button variant="warning" type="submit">Login</Button>
                                    <Button variant="link" onClick={handleForgotPassword} className="text-decoration-none text-primary">
                                        Forgot Password?
                                    </Button>
                                </div>
                            </Form>
                            <p className="text-center mt-3">Don't have an account? <a href="/signup">Sign Up</a></p>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Login;

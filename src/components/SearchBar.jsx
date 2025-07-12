import { InputGroup, Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";

// Web Speech API ko browser compatibility ke sath handle karna
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const SearchBar = ({ onSearch }) => {
    const [search, setSearch] = useState('');
    const [isListening, setIsListening] = useState(false);

    useEffect(() => {
        if (!SpeechRecognition) {
            alert("Voice search is not supported in this browser.");
        }
    }, []);

    const handleVoiceSearch = () => {
        if (!SpeechRecognition) return;

        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.start();
        setIsListening(true);

        recognition.onresult = (event) => {
            const voiceQuery = event.results[0][0].transcript;
            console.log("Voice recognized: ", voiceQuery);
            setSearch(voiceQuery);
            onSearch(voiceQuery);
        };

        recognition.onerror = (event) => {
            console.error("Speech recognition error:", event.error);
        };

        recognition.onend = () => {
            setIsListening(false);
        };
    };

    return (
        <InputGroup className="mb-3">
            <Form.Control
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <Button
                variant="danger"
                onClick={() => {
                    onSearch(search);
                    setSearch('');
                }}
            >
                Search
            </Button>
            <Button variant={isListening ? "secondary" : "outline-secondary"} onClick={handleVoiceSearch}>
                🎤
            </Button>
        </InputGroup>
    );
};

export default SearchBar;
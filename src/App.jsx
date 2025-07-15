import { useEffect, useState } from 'react';
import { Container, Col, Row, Button, Spinner } from 'react-bootstrap';
import MainVideo from "./components/MainVideo";
import List from "./components/List";
import SearchBar from "./components/SearchBar";
import youtube from "./api/youtube.js";
import { useTheme } from './ThemeContext.jsx';
import CategoryBar from "./components/CategoryBar";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';
import Footer from "./components/Footer.jsx";  // ✅ Footer imported

const App = () => {
  const [mainVideo, setMainVideo] = useState(null);
  const [list, setList] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const { darkMode, toggleTheme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 🔐 Check if user is logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/login');
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    async function getData() {
      try {
        let response;
        if (!searchValue) {
          response = await youtube.get('videos', {
            params: {
              part: "snippet",
              chart: "mostPopular",
              maxResults: 5,
              regionCode: "IN",
              key: "AIzaSyBjsoqhon_F2OFxz5C7odf_K77B_sSMSj0"
            }
          });
        } else {
          response = await youtube.get('search', {
            params: {
              part: "snippet",
              maxResults: 5,
              q: searchValue,
              type: "video",
              key: "AIzaSyBjsoqhon_F2OFxz5C7odf_K77B_sSMSj0"
            }
          });
        }

        const items = response.data.items;
        const formattedItems = items.map(item =>
          item.id?.videoId ? item : { ...item, id: { videoId: item.id } }
        );

        setMainVideo(formattedItems[0]);
        setList(formattedItems);
      } catch (err) {
        console.error("Video fetch error:", err);
      }
    }

    getData();
  }, [searchValue]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSearchValue(category);
  };

  // 🔓 Logout
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container
      fluid
      className={`mt-3 min-vh-100 p-0 d-flex flex-column ${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}
      style={{
        background: darkMode
          ? "linear-gradient(120deg, #000000, #434343)"
          : "linear-gradient(120deg, #f6d365, #fda085)",
        transition: "background 0.4s ease-in-out",
        minHeight: '100vh',
      }}
    >
      {/* 🌓 Dark Mode + Logout */}
      <div className="d-flex justify-content-end p-2 gap-2">
        <Button
          variant={darkMode ? "light" : "dark"}
          onClick={toggleTheme}
          style={{
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            borderRadius: "20px",
            fontWeight: "bold",
          }}
        >
          {darkMode ? "☀ Light" : "🌙 Dark"}
        </Button>

        <Button
          variant={darkMode ? "light" : "dark"}
          onClick={handleLogout}
          style={{
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
            borderRadius: "20px",
            fontWeight: "bold",
          }}
        >
          Logout
        </Button>
      </div>

      {/* 📺 Main Content */}
      <Container className="mt-2 flex-grow-1">
        <CategoryBar onCategorySelect={handleCategorySelect} selectedCategory={selectedCategory} />
        <SearchBar onSearch={setSearchValue} />
        <Row>
          <Col sm={8}>
            <MainVideo mainVideo={mainVideo} />
          </Col>
          <Col sm={4}>
            <List list={list} setMainVideo={setMainVideo} />
          </Col>
        </Row>
      </Container>

      {/* 📩 Footer */}
      <Footer />
    </Container>
  );
};

export default App;

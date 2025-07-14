import { useEffect, useState } from 'react'
import { Container, Col, Row, Button } from "react-bootstrap"
import MainVideo from "./components/MainVideo"
import List from "./components/List"
import SearchBar from "./components/SearchBar";
import youtube from "./api/youtube.js";
import { useTheme } from './ThemeContext.jsx';
import CategoryBar from "./components/CategoryBar"; 

const App = () => {

  const [mainVideo, setMainVideo] = useState(null)
  const [list, setList] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const { darkMode, toggleTheme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState(null);

  //useEffect() hmesa UI k bad chlta hai
  useEffect(() => {
    async function getData() {
      try {
        let response;

        if (!searchValue) {
          // 🎯 Trending (mostPopular) videos
          response = await youtube.get('videos', {
            params: {
              part: "snippet",
              chart: "mostPopular",
              maxResults: 5,
              regionCode: "IN", // You can change it based on user location
              key: "AIzaSyARNMAN0P2DAgniwmwCb1hhHX3vszBBJpo"
            }
          });
        } else {
          // 🔍 Keyword-based search
          response = await youtube.get('search', {
            params: {
              part: "snippet",
              maxResults: 5,
              q: searchValue,
              type: "video",
              key: "AIzaSyARNMAN0P2DAgniwmwCb1hhHX3vszBBJpo"
            }
          });
        }

        const items = response.data.items;

        const formattedItems = items.map(item => {
          return item.id?.videoId
            ? item
            : { ...item, id: { videoId: item.id } };
        });

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
  
  return (
    <Container
      fluid
      className={`mt-3 min-vh-100 p-0 ${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}
      style={{
        background: darkMode
          ? "linear-gradient(120deg, #000000, #434343)"
          : "linear-gradient(120deg, #f6d365, #fda085)",
        transition: "background 0.4s ease-in-out",
      }}
    >
      <div className="d-flex justify-content-end p-2">
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
      </div>


      <Container className="mt-2">
        <CategoryBar onCategorySelect={handleCategorySelect} selectedCategory={selectedCategory} />
        <SearchBar onSearch={setSearchValue} />
        <Row>
          <Col sm={8} >
            <MainVideo mainVideo={mainVideo} />
          </Col>
          <Col sm={4} >
            <List list={list} setMainVideo={setMainVideo} />
          </Col>
        </Row>
      </Container>
    </Container>
  )
}

export default App

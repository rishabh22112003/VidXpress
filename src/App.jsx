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
    //getData()
    async function getData() {
      const response = await youtube.get('search', {
        params: {
          part: "snippet",
          maxResults: 5,
          key: "AIzaSyARNMAN0P2DAgniwmwCb1hhHX3vszBBJpo",
          q: searchValue || 'computer programming'
        }
      })
      //console.log(response.data, "==>response")
      setMainVideo(response.data.items[0])
      setList(response.data.items)
    }
    getData()
  }, [searchValue])

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSearchValue(category);
  };
  
  return (
    <Container fluid className={`mt-3 min-vh-100 ${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
      <div className="d-flex justify-content-end p-2">
        <Button variant={darkMode ? "light" : "dark"} onClick={toggleTheme}>
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

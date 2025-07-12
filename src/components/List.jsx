import { Container } from "react-bootstrap"
import ListItem from "./ListItem"
import { useTheme } from "../ThemeContext"


const List = ({ list, setMainVideo }) => {
    const { darkMode } = useTheme();
    if (list.length === 0) return <h1>Loading...</h1>

    return <Container className={`p-3 mb-3 rounded ${darkMode ? 'bg-secondary text-light' : 'bg-white text-dark'}`}>
        {list.map(item => <ListItem videoDetail={item} setMainVideo={setMainVideo} />)}
    </Container>
}
export default List
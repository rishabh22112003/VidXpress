import { Container, Row, Col, Image } from "react-bootstrap"
import { useTheme } from "../ThemeContext"

const ListItem = ({ videoDetail, setMainVideo }) => {
    const { darkMode } = useTheme();
    //console.log(videoDetail)
    return <Container className={`mt-3 p-2 rounded ${darkMode ? 'bg-dark text-light' : 'bg-white text-dark'} shadow-sm`}
        onClick={() => setMainVideo(videoDetail)}
        style={{ cursor: 'pointer' }}  >
        <Row>
            <Col sm={8}>
                <Image
                    src={videoDetail.snippet.thumbnails.medium.url}
                    thumbnail
                />
            </Col>
            <Col sm={8}>
                {videoDetail.snippet.channelTitle}
            </Col>
        </Row>
    </Container>

}
export default ListItem
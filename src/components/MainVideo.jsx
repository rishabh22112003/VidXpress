import { Container, Image, } from "react-bootstrap"
import { useTheme } from "../ThemeContext"

const MainVideo = ({ mainVideo }) => {
    const { darkMode } = useTheme();
    //console.log("mainVideo", mainVideo)

    if (mainVideo === null) return <h1>Loading...</h1>
    let videoSrc = `https://www.youtube.com/embed/${mainVideo.id.videoId}`

    return <Container className={`p-3 mb-3 rounded ${darkMode ? 'bg-secondary text-light' : 'bg-white text-dark'}`}>
        {/* <Image
            src={mainVideo.snippet.thumbnails.high.url}
            thumbnail
        /> */}

        <iframe src={videoSrc}
            width={'100%'} height={'400'} />

        <h5>{mainVideo.snippet.channelTitle}</h5>
        <p>{mainVideo.snippet.description}</p>
    </Container>
}

export default MainVideo
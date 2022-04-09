import { Link } from 'react-router-dom'
import './Home.css'
function Home () {
    return (
        <div className="intro">
            <div>
                <Link to={ '/tenzies'} >
                    <img src="./tenzies.png" />
                </Link>
            </div>
            <div>
                <Link to={ '/quizzical' } >
                    <img src="./quizzical.png" />
                </Link>
            </div>
        </div>
    )
}

export default Home
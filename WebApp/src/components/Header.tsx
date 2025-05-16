import { Link } from 'react-router-dom';
import '../css/header.scss';
const styles = {
    header: {
        backgroundColor: '#333',
        color: 'white!important',
        padding: '1rem',
    } 
};
export default function Header() {
    return (
    <header style={styles.header}>
        <nav>
                <ul className="nav-list">
                    <li> <Link  to="/"> Home </Link> </li> 
                    <li> <Link to="/titles">Titles Summary </Link>  </li>
                    <li> <Link to="/paragraphs"> Title Paragraphs</Link></li> 
                    <li> <Link to="/contact"> Contact </Link> </li>
                    <li> <Link to="/about">About</Link> </li> 
                    <li> <Link to="/privacy">Privacy</Link> </li>  
            </ul>
        </nav>
    </header>
    )
}
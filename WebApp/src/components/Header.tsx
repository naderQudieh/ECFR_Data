import { Link } from "@tanstack/react-router";
const activeProps = {
    className: "font-bold",
};
export function Header() {
    return (
        <header style={{
            backgroundColor: '#1a1a1a',
            color: 'white',
            padding: '1rem',
            marginBottom: '2rem'
        }}>
            <div id="loading-indicator">
                <div id="loading">  </div>
            </div>
            <nav>
                <ul className="flex gap-2">
                    <li>
                        <Link to="/" activeProps={activeProps}>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/titles" activeProps={activeProps}>
                            Titles Summary
                        </Link>
                    </li>
                    <li>
                        <Link to="/paragraphs" activeProps={activeProps}>
                            Title Paragraphs
                        </Link>
                    </li> 
                </ul>
            </nav>
        </header>
    )
}
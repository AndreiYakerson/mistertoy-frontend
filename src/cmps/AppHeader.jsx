import { NavLink } from "react-router-dom";


export function AppHeader() {


    return (
        <header className="app-header full main-layout">
            <h1>Mister Toy</h1>
            <nav className="app-nav">
                <NavLink to="/" >Home</NavLink>
                <NavLink to="/about" >About</NavLink>
                <NavLink to="/toy" >Toys</NavLink>
            </nav>
        </header>
    )
}

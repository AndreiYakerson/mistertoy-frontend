import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logout } from "../store/actions/user.actions";


export function AppHeader() {
    const user = useSelector(storeState => storeState.userModule.loggedInUser)
    const navigate = useNavigate()

    function onLogout() {
        logout()
        navigate('/')
    }

    return (
        <header className="app-header full main-layout">
            <h1>Mister Toy</h1>
            <nav className="app-nav">
                <NavLink to="/" >Home</NavLink>
                <NavLink to="/about" >About</NavLink>
                <NavLink to="/toy" >Toys</NavLink>
                <NavLink to="/dashboard" >Dashboard</NavLink>
                {
                    user ?
                        <>
                            <NavLink to="/profile" >{user.fullname}</NavLink>
                            <Link to="/profile"><img src={user.imgUrl} alt="" className="small-img" /></Link>
                            <button onClick={onLogout}>Logout</button>
                        </>
                        :
                        <NavLink to="/login" >Login</NavLink>
                }

            </nav>
        </header>
    )
}

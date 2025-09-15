import { useRef, useState } from "react"
import { userService } from "../services/user.service"
import { useNavigate } from "react-router-dom"
import { SET_USER } from "../store/reducers/user.reducer"
import { login, logout, signup } from "../store/actions/user.actions"

export function ToyLogin() {

    const [loginState, setLoginState] = useState(true)
    const navigate = useNavigate()

    const form = useRef()

    function onSubmit(ev) {
        ev.preventDefault()

        const fullname = form.current.fullname?.value
        const username = form.current.username.value
        const password = form.current.password.value

        const credentials = { fullname, username, password }

        if (loginState) {
            login(credentials).then((res) => {
                if (res) navigate('/toy')
            })
        } else {
            signup(credentials).then((res) => {
                if (res) navigate('/toy')
            })
        }

    }


    return (
        <div className="login-form">
            <h1>Login</h1>
            <form ref={form}>
                {!loginState &&
                    <>
                        <label htmlFor="fullname">Full name:</label>
                        <input type="text" id="fullname" name="fullname" required />
                    </>
                }
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" required />
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" required />
                <button type="submit" onClick={onSubmit}>{loginState ? 'Login' : 'Signup'}</button>
            </form>
            <a href="#" onClick={() => setLoginState(prevState => !prevState)}>
                {loginState ? 'Need to create an account? Signup' : 'Already have an account? Login'}
            </a>
        </div>
    )
}
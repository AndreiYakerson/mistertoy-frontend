import { useRef, useState } from "react"
import { userService } from "../services/user.service"
import { useNavigate } from "react-router-dom"
import { SET_USER } from "../store/reducers/user.reducer"
import { login, logout, signup } from "../store/actions/user.actions"
import { ImgUploader } from "../cmps/ImgUploader"

export function ToyLogin() {

    const [loginState, setLoginState] = useState(true)
    const [credentials, setCredentials] = useState({fullname: '', username: '', password: '', imgUrl: ''})

    const navigate = useNavigate()

    const form = useRef()

    function onSubmit(ev) {
        ev.preventDefault()

        const fullname = form.current.fullname?.value
        const username = form.current.username.value
        const password = form.current.password.value

        const userCredential = {...credentials, fullname, username, password}


        if (loginState) {
            login(userCredential).then((res) => {
                if (res) navigate('/toy')
            })
        } else {
            console.log(userCredential);

            signup(userCredential).then((res) => {
                if (res) navigate('/toy')
            })
        }

    }

    function onUploaded(imgUrl) {
        setCredentials(prevCredentials => ({ ...prevCredentials, imgUrl }))
        console.log(credentials);
        
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
                {!loginState && <ImgUploader onUploaded={onUploaded} />}
            </form>
            <a href="#" onClick={() => setLoginState(prevState => !prevState)}>
                {loginState ? 'Need to create an account? Signup' : 'Already have an account? Login'}
            </a>
        </div>
    )
}
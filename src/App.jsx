
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import './assets/style/main.css'
import { AppHeader } from './cmps/AppHeader.jsx'
// import { Provider } from 'react-redux'

export default function App() {

    return (
        <Router>
            <AppHeader />
        <section className="app">
                    <Route element={<HomePage />} path='/' />
                    <Route element={<AboutPage />} path='/about' />
                    <Route element={<ToyIndex />} path='/toy' />
            <AppFooter />

        </section>

        </Router>

    )
}
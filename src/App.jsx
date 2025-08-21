
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import './assets/style/main.css'

// import { Provider } from 'react-redux'

//CMPS
import { AppHeader } from './cmps/AppHeader.jsx'

//Pages
import { HomePage } from './pages/HomePage.jsx'
import { AboutPage } from './pages/AboutPage.jsx'
import { ToyIndex } from './pages/ToyIndex.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'


export default function App() {

    return (
        <Router>
        <section className="app">
            <AppHeader />
            <main className="main-layout">
                <Routes>
                    <Route element={<HomePage />} path='/' />
                    <Route element={<AboutPage />} path='/about' />
                    <Route element={<ToyIndex />} path='/toy' />
                </Routes>
            </main>
            <AppFooter />

        </section>

        </Router>

    )
}
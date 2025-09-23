import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

import { toyService } from "../services/toy.service.server.js";
import { PopUp } from "./PopUp.jsx";
import { Chat } from "./Chat.jsx";
import { ToyReview } from "./ToyReview.jsx";
import { reviewService } from "../services/review.service.js";



export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const [reviews, setReviews] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const { toyId } = useParams()
    const navigate = useNavigate()


    useEffect(() => {
        loadToy()
        loadReviews()
    }, [toyId])


    function loadToy() {
        toyService.getById(toyId)
            .then(setToy)
            .catch(err => {
                console.log('Can not loading toy details:', err);
                navigate('/toy')
            })
    }

    function loadReviews() {
        reviewService.query({ aboutToyId: toyId })
            .then(setReviews)
    }


    if (!toy) return <div className="loading"></div>


    return (
        <section className="toy-details">


            <div className="toy-info ">
                <h1>{toy.name}</h1>
                <h2>Price: ${toy.price}</h2>
                <hr />
                <h3>Description:</h3>
                <p>{toy.description}</p>
                <h3>Labels:</h3>
                <div className="labels-container">{toy.labels.map(label => {
                    return <span key={label} className="label" >{label} </span>
                })}</div>
                {toy.inStock ? <p className="in-stock" style={{ color: 'blue' }}>In Stock</p> : <p className="out-of-stock" style={{ color: 'red' }}>Out of Stock</p>}

                <div className="details-btns">
                    <button>
                        <Link to={'/toy'}>Back</Link>
                    </button>
                    <button>
                        <Link to={`/toy/edit/${toy._id}`}>Edit</Link>
                    </button>
                </div>


                {!isOpen && <button className="btn pop-up-btn" onClick={() => setIsOpen(true)}>Chat</button>}
                <PopUp
                    header={'Chat'}
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                >
                    <Chat />

                </PopUp>
            </div>

            <ToyReview
                toy={toy}
                reviews={reviews}
                setReviews={setReviews}
            />
            <img className="detail-img" src={`../${toy.imgUrl}`} alt="" />
        </section>
    )
}
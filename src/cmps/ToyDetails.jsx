import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

import { toyService } from "../services/toy.service-local.js";
import { ToyPreview } from "./ToyPreview.jsx";



export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadToy()
    }, [toyId])


    function loadToy() {
        toyService.getById(toyId)
            .then(setToy)
            .catch(err => {
                console.log('Can not loading toy details:', err);
                navigate('/toy')
            })
    }

    if (!toy) return <div className="loading">Loading...</div>


    return (
        <section className="toy-details">


            <div className="toy-info ">
                <h1>{toy.name}</h1>
                <h2>Price: ${toy.price}</h2>
                <hr />
                <h3>Description:</h3>
                <p>{toy.description}</p>
                {toy.inStock ? <p className="in-stock" style={{ color: 'blue' }}>In Stock</p> : <p className="out-of-stock" style={{ color: 'red' }}>Out of Stock</p>}

                <div className="details-btns">
                <button><Link to={'/toy'}>Back</Link></button>
                <button className="btn">Buy</button>
                </div>
            </div>

            <img src={`../${toy.imgUrl}`} alt="" />
        </section>
    )
}
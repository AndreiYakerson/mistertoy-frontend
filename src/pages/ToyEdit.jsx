import { use, useEffect, useState } from "react"
import { toyService } from "../services/toy.service-local"
import { Link, useNavigate, useParams } from "react-router-dom"
import { saveToy } from "../store/actions/toy.actions.js"
import { utilService } from "../services/util.service.js"


export function ToyEdit() {

    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())

    const { toyId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadToy()
    }, [])

    function loadToy() {
        if (!toyId) return
        toyService.getById(toyId)
            .then(setToyToEdit)
            .catch(err => {
                console.log('Had issues in toy details', err)
                navigate('/toy')
            })
    }

    function handleChange({ target }) {
        const { name, value, type, checked } = target
        let fieldValue = value
        if (type === 'checkbox') {
            fieldValue = checked
        } else if (type === 'number') {
            fieldValue = +value
        }

        setToyToEdit(prevToy => ({
            ...prevToy,
            [name]: fieldValue
        }))
    }

    function onSaveToy(ev) {
        ev.preventDefault()
        saveToy(toyToEdit)
            .then(() => navigate('/toy'))
    }
    console.log(toyToEdit);

    return (

        <section className="toy-edit toy-filter">
            <h2>{toyToEdit._id ? 'Edit' : 'Add'} Toy</h2>

            <div className="form-container">

                <form className="edit-form" action="submit" onSubmit={onSaveToy}>
                    <label htmlFor="name">Name:</label>
                    <input onChange={handleChange} type="text" id="name" name="name" value={toyToEdit.name} />

                    <label htmlFor="price">Price:</label>
                    <input onChange={handleChange} type="number" id="price" name="price" value={toyToEdit.price} />

                    <label htmlFor="inStock">In Stock:</label>
                    <input onChange={handleChange} type="checkbox" id="inStock" name="inStock" checked={toyToEdit.inStock} />

                    <button type="submit" onClick={onSaveToy}>
                        {toyToEdit._id ? 'Save Changes' : 'Add Toy'}
                    </button>
                </form>
            </div>
            <button><Link to={'/toy'}>Back</Link></button>
        </section>
    )
}
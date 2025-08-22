import { useEffect, useState } from "react";
import { ToyList } from "../cmps/ToyList.jsx";
import { toyService } from "../services/toy.service-local.js";
import { Loading } from "../cmps/Loading.jsx";

export function ToyIndex() {

    const [toys, setToys] = useState([]);

    useEffect(() => {
        loadToys();
    }, []);

    function loadToys() {
        return toyService.query()
            .then(toys => {
                console.log('Toys loaded:', toys);
                setToys(toys);
            })
            .catch(err => {
                console.error('Error loading toys:', err);
            });
    }

    function onAddToy() {
        const toy = toyService.getRandomToy();

        toyService.save(toy)
            .then(savedToy => {
                setToys(prevToys => [...prevToys, savedToy]);
                console.log('Saved toy:', savedToy);
            })
            .catch(err => {
                console.error('Can not saving toy:', err);
            });
    }

    function onRemoveToy(toyId) {
        return toyService.remove(toyId)
            .then(() => setToys(prevToys => prevToys.filter(toy => toy._id !== toyId)))
            .catch(err => {
                console.error('Can not removing toy:', err);
            });
    }

    if (!toys.length) return <Loading />

    return (

        <div className="toy-index">
            <header>
            </header>
            <main>
                <button onClick={onAddToy}>Add toy</button>
            </main>

            <section>
                <hr />
                <h1>Toy list:</h1>
                <ToyList onRemoveToy={onRemoveToy} toys={toys} />
            </section>

        </div>

    )

}